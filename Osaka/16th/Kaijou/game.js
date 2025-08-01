    new Vue({
      el: '#app',
      data: {
        width: 31, //横の広さ
        height: 17,//縦の広さ
        maze: [],
        playerPos: { x: 1, y: 1 },
        goalPos: { x: 29, y: 15 },
        visited: [],
        lightItemPos: null,
        hasLight: false
      },
      mounted() {
        this.generateMaze();
        this.$el.focus();
        this.$el.addEventListener('keydown', this.handleKey);
      },
      methods: {
        generateMaze() {
          this.maze = Array(this.height).fill().map(() =>
            Array(this.width).fill('wall')
          );

          const carve = (x, y) => {
            this.maze[y][x] = 'path';

            const directions = [
              [2, 0], [-2, 0], [0, 2], [0, -2]
            ].sort(() => Math.random() - 0.5);

            for (const [dx, dy] of directions) {
              const nx = x + dx;
              const ny = y + dy;

              if (ny > 0 && ny < this.height - 1 && nx > 0 && nx < this.width - 1) {
                if (this.maze[ny][nx] === 'wall') {
                  this.maze[y + dy / 2][x + dx / 2] = 'path';
                  carve(nx, ny);
                }
              }
            }
          };

          carve(1, 1);
          this.playerPos = { x: 1, y: 1 };
          this.visited = [{ x: 1, y: 1 }];
          this.goalPos = { x: Math.floor(Math.random() * (this.width - 2)) + 1 , y: this.height - 2 }; //ゴールの位置
          this.maze[this.goalPos.y][this.goalPos.x] = 'goal';
          this.hasLight = false;

          // ランダムにたいまつ配置
          let lx, ly;
          do {
            lx = Math.floor(Math.random() * (this.width - 2)) + 1;
            ly = Math.floor(Math.random() * (this.height - 2)) + 1;
          } while (this.maze[ly][lx] !== 'path' || (lx === 1 && ly === 1));
          this.lightItemPos = { x: lx, y: ly };
        },

        getCellClass(x, y) {
          if (this.playerPos.x === x && this.playerPos.y === y) return 'player';
          if (this.lightItemPos && x === this.lightItemPos.x && y === this.lightItemPos.y && !this.hasLight)
            return 'light-item';

          const dx = Math.abs(this.playerPos.x - x);
          const dy = Math.abs(this.playerPos.y - y);
          const view = this.hasLight ? 3 : 1;

          const isNear = dx <= view && dy <= view;
          const isVisited = this.visited.some(p => p.x === x && p.y === y);

          if (!isNear && !isVisited) return 'dark';

          return this.maze[y][x];
        },
        
        getCellText(x, y) {
          if (this.playerPos.x === x && this.playerPos.y === y) return ' ';
          if (this.maze[y][x] === 'goal') return ' ';
          if (this.lightItemPos && x === this.lightItemPos.x && y === this.lightItemPos.y && !this.hasLight)
            return '💡';
          return '';
        },

        handleKey(e) {
          const key = e.key;
          let newX = this.playerPos.x;
          let newY = this.playerPos.y;

          if (key === 'ArrowUp') newY--;
          else if (key === 'ArrowDown') newY++;
          else if (key === 'ArrowLeft') newX--;
          else if (key === 'ArrowRight') newX++;
          else return;

          if (this.canMove(newX, newY)) {
            this.playerPos = { x: newX, y: newY };

            if (!this.visited.some(p => p.x === newX && p.y === newY)) {
              this.visited.push({ x: newX, y: newY });
            }

            if (this.lightItemPos &&
                newX === this.lightItemPos.x &&
                newY === this.lightItemPos.y &&
                !this.hasLight) {
              this.hasLight = true;
              alert('たいまつを手に入れた！視界が広がった！');
            }

            if (this.maze[newY][newX] === 'goal') {
              alert('ゴール！');
              this.generateMaze();
            }
          }
        },

        canMove(x, y) {
          if (y < 0 || y >= this.maze.length) return false;
          if (x < 0 || x >= this.maze[0].length) return false;
          if (this.maze[y][x] === 'wall') return false;
          return true;
        }
      }
    });