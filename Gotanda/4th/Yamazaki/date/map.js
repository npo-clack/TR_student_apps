(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map",
{ "compressionlevel":-1,
 "height":20,
 "infinite":false,
 "layers":[
        {
         "data":[3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994,
            3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994, 3994],
         "height":20,
         "id":1,
         "name":"\u30bf\u30a4\u30eb\u30ec\u30a4\u30e4\u30fc1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":30,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":32,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"[Base]BaseChip_pipo.png",
         "imageheight":7968,
         "imagewidth":256,
         "margin":0,
         "name":"[Base]BaseChip_pipo",
         "spacing":0,
         "tilecount":1992,
         "tileheight":32,
         "tilewidth":32
        }, 
        {
         "columns":8,
         "firstgid":1993,
         "image":"[Base]BaseChip_pipo.png",
         "imageheight":7968,
         "imagewidth":256,
         "margin":0,
         "name":"[Base]BaseChip_pipo",
         "spacing":0,
         "tilecount":1992,
         "tileheight":32,
         "tilewidth":32
        }, 
        {
         "columns":2,
         "firstgid":3985,
         "image":"[A]Grass4_pipo.png",
         "imageheight":160,
         "imagewidth":64,
         "margin":0,
         "name":"[A]Grass4_pipo",
         "spacing":0,
         "tilecount":10,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.10",
 "width":30
});