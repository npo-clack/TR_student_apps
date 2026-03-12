/* --- Spookeez Nightmare Offline譜面 --- */

const embeddedNotes = [
  {t:5.783,lane:'o-left',owner:'opp'},
  {t:5.964,lane:'o-down',owner:'opp'},
  {t:6.145,lane:'o-right',owner:'opp'},
  {t:6.325,lane:'o-left',owner:'opp'},
  {t:6.506,lane:'o-right',owner:'opp'},
  {t:6.687,lane:'o-down',owner:'opp'},
  {t:6.867,lane:'o-up',owner:'opp'},
  {t:7.048,lane:'o-right',owner:'opp'},
  {t:7.229,lane:'o-down',owner:'opp'},
  {t:7.410,lane:'o-right',owner:'opp'},
  {t:7.590,lane:'o-left',owner:'opp'},
  {t:7.771,lane:'o-left',owner:'opp'},
  {t:7.952,lane:'o-down',owner:'opp'},
  {t:8.313,lane:'o-up',owner:'opp'},
  {t:8.494,lane:'o-left',owner:'opp'},
  {t:8.675,lane:'p-left',owner:'player'},
  {t:8.855,lane:'p-down',owner:'player'},
  {t:9.036,lane:'p-right',owner:'player'},
  {t:9.398,lane:'p-right',owner:'player'},
  {t:9.759,lane:'p-up',owner:'player'},
  {t:9.940,lane:'p-right',owner:'player'},
  {t:10.120,lane:'p-left',owner:'player'},
  {t:10.166,lane:'p-down',owner:'player'},
  {t:10.301,lane:'p-right',owner:'player'},
  {t:10.482,lane:'p-left',owner:'player'},
  {t:10.843,lane:'p-right',owner:'player'},
  {t:11.024,lane:'p-down',owner:'player'},
  {t:11.205,lane:'p-right',owner:'player'},
  {t:11.386,lane:'p-left',owner:'player'},
  {t:11.566,lane:'o-up',owner:'opp'},
  {t:11.566,lane:'p-up',owner:'player'},
  {t:11.747,lane:'o-right',owner:'opp'},
  {t:11.837,lane:'o-down',owner:'opp'},
  {t:11.928,lane:'o-left',owner:'opp'},
  {t:12.108,lane:'o-down',owner:'opp'},
  {t:12.289,lane:'o-right',owner:'opp'},
  {t:12.470,lane:'o-down',owner:'opp'},
  {t:12.651,lane:'o-up',owner:'opp'},
  {t:12.831,lane:'o-down',owner:'opp'},
  {t:13.012,lane:'p-down',owner:'player'},
  {t:13.012,lane:'o-down',owner:'opp'},
  {t:13.102,lane:'o-up',owner:'opp'},
  {t:13.193,lane:'o-left',owner:'opp'},
  {t:13.373,lane:'o-right',owner:'opp'},
  {t:13.554,lane:'o-left',owner:'opp'},
  {t:13.735,lane:'p-right',owner:'player'},
  {t:13.735,lane:'o-down',owner:'opp'},
  {t:13.916,lane:'o-left',owner:'opp'},
  {t:14.096,lane:'o-right',owner:'opp'},
  {t:14.096,lane:'p-left',owner:'player'},
  {t:14.277,lane:'o-up',owner:'opp'},
  {t:14.458,lane:'p-right',owner:'player'},
  {t:14.458,lane:'o-down',owner:'opp'},
  {t:14.639,lane:'p-up',owner:'player'},
  {t:14.819,lane:'p-right',owner:'player'},
  {t:15.000,lane:'p-down',owner:'player'},
  {t:15.181,lane:'o-down',owner:'opp'},
  {t:15.181,lane:'p-left',owner:'player'},
  {t:15.361,lane:'p-right',owner:'player'},
  {t:15.542,lane:'p-left',owner:'player'},
  {t:15.723,lane:'p-up',owner:'player'},
  {t:15.813,lane:'p-down',owner:'player'},
  {t:15.904,lane:'p-right',owner:'player'},
  {t:15.904,lane:'o-down',owner:'opp'},
  {t:15.994,lane:'p-down',owner:'player'},
  {t:16.084,lane:'p-right',owner:'player'},
  {t:16.175,lane:'p-left',owner:'player'},
  {t:16.265,lane:'p-right',owner:'player'},
  {t:16.355,lane:'p-down',owner:'player'},
  {t:16.446,lane:'p-right',owner:'player'},
  {t:16.536,lane:'p-left',owner:'player'},
  {t:16.627,lane:'o-down',owner:'opp'},
  {t:16.627,lane:'p-up',owner:'player'},
  {t:16.807,lane:'p-down',owner:'player'},
  {t:16.988,lane:'p-right',owner:'player'},
  {t:17.169,lane:'p-left',owner:'player'},
  {t:17.349,lane:'o-left',owner:'opp'},
  {t:17.349,lane:'p-right',owner:'player'},
  {t:17.530,lane:'p-left',owner:'player'},
  {t:17.711,lane:'p-up',owner:'player'},
  {t:17.892,lane:'p-left',owner:'player'},
  {t:17.892,lane:'o-right',owner:'opp'},
  {t:18.072,lane:'o-down',owner:'opp'},
  {t:18.072,lane:'p-right',owner:'player'},
  {t:18.253,lane:'p-up',owner:'player'},
  {t:18.434,lane:'p-down',owner:'player'},
  {t:18.614,lane:'p-right',owner:'player'},
  {t:18.614,lane:'o-right',owner:'opp'},
  {t:18.795,lane:'p-down',owner:'player'},
  {t:18.795,lane:'o-left',owner:'opp'},
  {t:18.976,lane:'p-left',owner:'player'},
  {t:19.157,lane:'p-up',owner:'player'},
  {t:19.337,lane:'o-up',owner:'opp'},
  {t:19.337,lane:'p-down',owner:'player'},
  {t:19.518,lane:'p-right',owner:'player'},
  {t:19.518,lane:'o-right',owner:'opp'},
  {t:19.880,lane:'p-left',owner:'player'},
  {t:19.970,lane:'p-right',owner:'player'},
  {t:20.060,lane:'p-up',owner:'player'},
  {t:20.060,lane:'o-right',owner:'opp'},
  {t:20.151,lane:'p-right',owner:'player'},
  {t:20.241,lane:'o-down',owner:'opp'},
  {t:20.241,lane:'p-left',owner:'player'},
  {t:20.783,lane:'o-left',owner:'opp'},
  {t:20.783,lane:'p-right',owner:'player'},
  {t:20.964,lane:'p-up',owner:'player'},
  {t:20.964,lane:'o-up',owner:'opp'},
  {t:21.145,lane:'p-right',owner:'player'},
  {t:21.325,lane:'p-left',owner:'player'},
  {t:21.325,lane:'o-down',owner:'opp'},
  {t:21.506,lane:'p-right',owner:'player'},
  {t:21.687,lane:'p-down',owner:'player'},
  {t:21.687,lane:'o-right',owner:'opp'},
  {t:21.867,lane:'p-left',owner:'player'},
  {t:22.048,lane:'p-right',owner:'player'},
  {t:22.048,lane:'o-up',owner:'opp'},
  {t:22.229,lane:'p-left',owner:'player'},
  {t:22.410,lane:'o-left',owner:'opp'},
  {t:22.410,lane:'p-up',owner:'player'},
  {t:22.771,lane:'o-down',owner:'opp'},
  {t:22.771,lane:'p-down',owner:'player'},
  {t:23.133,lane:'p-right',owner:'player'},
  {t:23.133,lane:'o-down',owner:'opp'},
  {t:23.313,lane:'p-down',owner:'player'},
  {t:23.404,lane:'p-right',owner:'player'},
  {t:23.494,lane:'p-down',owner:'player'},
  {t:23.584,lane:'p-left',owner:'player'},
  {t:23.675,lane:'p-down',owner:'player'},
  {t:23.675,lane:'o-up',owner:'opp'},
  {t:23.765,lane:'p-right',owner:'player'},
  {t:23.855,lane:'p-down',owner:'player'},
  {t:23.855,lane:'o-right',owner:'opp'},
  {t:23.946,lane:'p-left',owner:'player'},
  {t:24.036,lane:'p-down',owner:'player'},
  {t:24.127,lane:'p-right',owner:'player'},
  {t:24.217,lane:'p-down',owner:'player'},
  {t:24.307,lane:'p-left',owner:'player'},
  {t:24.398,lane:'o-left',owner:'opp'},
  {t:24.398,lane:'p-up',owner:'player'},
  {t:24.488,lane:'p-right',owner:'player'},
  {t:24.578,lane:'o-up',owner:'opp'},
  {t:24.578,lane:'p-left',owner:'player'},
  {t:24.759,lane:'p-up',owner:'player'},
  {t:24.940,lane:'p-left',owner:'player'},
  {t:25.120,lane:'p-down',owner:'player'},
  {t:25.120,lane:'o-left',owner:'opp'},
  {t:25.301,lane:'p-right',owner:'player'},
  {t:25.301,lane:'o-up',owner:'opp'},
  {t:25.482,lane:'p-up',owner:'player'},
  {t:25.663,lane:'p-right',owner:'player'},
  {t:25.843,lane:'p-left',owner:'player'},
  {t:25.843,lane:'o-right',owner:'opp'},
  {t:26.024,lane:'p-down',owner:'player'},
  {t:26.024,lane:'o-down',owner:'opp'},
  {t:26.386,lane:'p-right',owner:'player'},
  {t:26.566,lane:'o-left',owner:'opp'},
  {t:26.747,lane:'p-left',owner:'player'},
  {t:26.747,lane:'o-right',owner:'opp'},
  {t:27.108,lane:'o-down',owner:'opp'},
  {t:27.108,lane:'p-up',owner:'player'},
  {t:27.470,lane:'o-right',owner:'opp'},
  {t:27.470,lane:'p-down',owner:'player'},
  {t:27.831,lane:'o-left',owner:'opp'},
  {t:27.831,lane:'p-left',owner:'player'},
  {t:28.193,lane:'o-up',owner:'opp'},
  {t:28.193,lane:'p-down',owner:'player'},
  {t:28.554,lane:'o-down',owner:'opp'},
  {t:28.554,lane:'p-right',owner:'player'},
  {t:28.645,lane:'p-down',owner:'player'},
  {t:28.735,lane:'p-left',owner:'player'},
  {t:28.825,lane:'p-up',owner:'player'},
  {t:28.916,lane:'o-left',owner:'opp'},
  {t:28.916,lane:'p-right',owner:'player'},
  {t:29.096,lane:'p-left',owner:'player'},
  {t:29.096,lane:'o-up',owner:'opp'},
  {t:29.277,lane:'p-up',owner:'player'},
  {t:29.277,lane:'o-right',owner:'opp'},
  {t:29.458,lane:'o-up',owner:'opp'},
  {t:29.458,lane:'p-down',owner:'player'},
  {t:29.548,lane:'o-left',owner:'opp'},
  {t:29.639,lane:'o-right',owner:'opp'},
  {t:29.639,lane:'p-down',owner:'player'},
  {t:29.819,lane:'p-right',owner:'player'},
  {t:30.000,lane:'o-down',owner:'opp'},
  {t:30.000,lane:'p-up',owner:'player'},
  {t:30.181,lane:'p-left',owner:'player'},
  {t:30.361,lane:'o-right',owner:'opp'},
  {t:30.361,lane:'p-right',owner:'player'},
  {t:30.542,lane:'p-up',owner:'player'},
  {t:30.723,lane:'p-left',owner:'player'},
  {t:30.723,lane:'o-down',owner:'opp'},
  {t:30.904,lane:'p-up',owner:'player'},
  {t:31.084,lane:'o-left',owner:'opp'},
  {t:31.084,lane:'p-right',owner:'player'},
  {t:31.265,lane:'p-down',owner:'player'},
  {t:31.446,lane:'o-right',owner:'opp'},
  {t:31.446,lane:'p-left',owner:'player'},
  {t:31.627,lane:'p-down',owner:'player'},
  {t:31.807,lane:'o-right',owner:'opp'},
  {t:31.807,lane:'p-up',owner:'player'},
  {t:31.852,lane:'o-down',owner:'opp'},
  {t:32.169,lane:'p-left',owner:'player'},
  {t:32.349,lane:'p-down',owner:'player'},
  {t:32.530,lane:'p-right',owner:'player'},
  {t:32.530,lane:'o-down',owner:'opp'},
  {t:32.892,lane:'p-left',owner:'player'},
  {t:33.072,lane:'p-up',owner:'player'},
  {t:33.253,lane:'o-down',owner:'opp'},
  {t:33.253,lane:'p-left',owner:'player'},
  {t:33.343,lane:'o-left',owner:'opp'},
  {t:33.343,lane:'p-down',owner:'player'},
  {t:33.434,lane:'o-up',owner:'opp'},
  {t:33.434,lane:'p-right',owner:'player'},
  {t:33.524,lane:'o-right',owner:'opp'},
  {t:33.524,lane:'p-up',owner:'player'},
  {t:33.614,lane:'o-up',owner:'opp'},
  {t:33.614,lane:'p-left',owner:'player'},
  {t:33.705,lane:'o-left',owner:'opp'},
  {t:33.705,lane:'p-down',owner:'player'},
  {t:33.795,lane:'o-up',owner:'opp'},
  {t:33.795,lane:'p-right',owner:'player'},
  {t:33.886,lane:'o-down',owner:'opp'},
  {t:33.886,lane:'p-up',owner:'player'},
  {t:33.976,lane:'p-left',owner:'player'},
  {t:33.976,lane:'o-right',owner:'opp'},
  {t:34.066,lane:'o-up',owner:'opp'},
  {t:34.157,lane:'o-down',owner:'opp'},
  {t:34.157,lane:'p-down',owner:'player'},
  {t:34.247,lane:'o-left',owner:'opp'},
  {t:34.337,lane:'p-right',owner:'player'},
  {t:34.337,lane:'o-right',owner:'opp'},
  {t:34.699,lane:'p-left',owner:'player'},
  {t:34.699,lane:'o-up',owner:'opp'},
  {t:34.880,lane:'p-up',owner:'player'},
  {t:35.060,lane:'p-right',owner:'player'},
  {t:35.241,lane:'o-left',owner:'opp'},
  {t:35.241,lane:'p-left',owner:'player'},
  {t:35.331,lane:'o-right',owner:'opp'},
  {t:35.422,lane:'o-down',owner:'opp'},
  {t:35.422,lane:'p-up',owner:'player'},
  {t:35.602,lane:'p-left',owner:'player'},
  {t:35.783,lane:'o-left',owner:'opp'},
  {t:35.783,lane:'p-right',owner:'player'},
  {t:35.964,lane:'p-up',owner:'player'},
  {t:36.145,lane:'o-down',owner:'opp'},
  {t:36.145,lane:'p-right',owner:'player'},
  {t:36.325,lane:'p-down',owner:'player'},
  {t:36.506,lane:'p-left',owner:'player'},
  {t:36.506,lane:'o-right',owner:'opp'},
  {t:36.687,lane:'p-up',owner:'player'},
  {t:36.867,lane:'o-down',owner:'opp'},
  {t:36.867,lane:'p-right',owner:'player'},
  {t:37.048,lane:'p-left',owner:'player'},
  {t:37.229,lane:'o-left',owner:'opp'},
  {t:37.229,lane:'p-right',owner:'player'},
  {t:37.410,lane:'p-down',owner:'player'},
  {t:37.590,lane:'p-left',owner:'player'},
  {t:37.590,lane:'o-right',owner:'opp'},
  {t:37.952,lane:'p-up',owner:'player'},
  {t:37.952,lane:'o-left',owner:'opp'},
  {t:37.997,lane:'p-right',owner:'player'},
  {t:38.133,lane:'p-left',owner:'player'},
  {t:38.223,lane:'p-right',owner:'player'},
  {t:38.313,lane:'o-right',owner:'opp'},
  {t:38.313,lane:'p-down',owner:'player'},
  {t:38.494,lane:'p-up',owner:'player'},
  {t:38.675,lane:'o-up',owner:'opp'},
  {t:38.675,lane:'p-left',owner:'player'},
  {t:38.855,lane:'p-down',owner:'player'},
  {t:39.036,lane:'o-down',owner:'opp'},
  {t:39.036,lane:'p-left',owner:'player'},
  {t:39.398,lane:'p-down',owner:'player'},
  {t:39.759,lane:'p-right',owner:'player'},
  {t:40.120,lane:'p-down',owner:'player'},
  {t:40.482,lane:'p-left',owner:'player'},
  {t:40.663,lane:'p-down',owner:'player'},
  {t:40.843,lane:'p-left',owner:'player'},
  {t:41.024,lane:'p-down',owner:'player'},
  {t:41.205,lane:'p-up',owner:'player'},
  {t:41.250,lane:'p-right',owner:'player'},
  {t:41.386,lane:'p-left',owner:'player'},
  {t:41.476,lane:'p-down',owner:'player'},
  {t:41.566,lane:'p-right',owner:'player'},
  {t:41.747,lane:'p-up',owner:'player'},
  {t:41.837,lane:'p-down',owner:'player'},
  {t:41.928,lane:'p-right',owner:'player'},
  {t:42.108,lane:'p-left',owner:'player'},
  {t:42.199,lane:'p-down',owner:'player'},
  {t:42.289,lane:'p-right',owner:'player'},
  {t:42.470,lane:'p-left',owner:'player'},
  {t:42.560,lane:'p-up',owner:'player'},
  {t:42.651,lane:'p-down',owner:'player'},
  {t:42.831,lane:'p-up',owner:'player'},
  {t:42.922,lane:'p-down',owner:'player'},
  {t:43.012,lane:'p-right',owner:'player'},
  {t:43.193,lane:'p-down',owner:'player'},
  {t:43.373,lane:'p-left',owner:'player'},
  {t:43.373,lane:'o-down',owner:'opp'},
  {t:43.554,lane:'o-right',owner:'opp'},
  {t:43.554,lane:'p-down',owner:'player'},
  {t:43.735,lane:'o-down',owner:'opp'},
  {t:43.735,lane:'p-left',owner:'player'},
  {t:43.916,lane:'p-down',owner:'player'},
  {t:43.916,lane:'o-left',owner:'opp'},
  {t:44.096,lane:'p-up',owner:'player'},
  {t:44.096,lane:'o-down',owner:'opp'},
  {t:44.142,lane:'p-right',owner:'player'},
  {t:44.277,lane:'p-left',owner:'player'},
  {t:44.367,lane:'p-down',owner:'player'},
  {t:44.458,lane:'p-right',owner:'player'},
  {t:44.639,lane:'p-left',owner:'player'},
  {t:44.729,lane:'p-down',owner:'player'},
  {t:44.819,lane:'p-up',owner:'player'},
  {t:44.819,lane:'o-left',owner:'opp'},
  {t:45.000,lane:'p-right',owner:'player'},
  {t:45.000,lane:'o-up',owner:'opp'},
  {t:45.090,lane:'p-left',owner:'player'},
  {t:45.181,lane:'o-right',owner:'opp'},
  {t:45.181,lane:'p-down',owner:'player'},
  {t:45.361,lane:'p-left',owner:'player'},
  {t:45.361,lane:'o-up',owner:'opp'},
  {t:45.452,lane:'p-right',owner:'player'},
  {t:45.542,lane:'o-left',owner:'opp'},
  {t:45.542,lane:'p-up',owner:'player'},
  {t:45.723,lane:'p-up',owner:'player'},
  {t:45.813,lane:'p-down',owner:'player'},
  {t:45.904,lane:'p-left',owner:'player'},
  {t:45.904,lane:'o-right',owner:'opp'},
  {t:46.084,lane:'p-right',owner:'player'},
  {t:46.265,lane:'p-left',owner:'player'},
  {t:46.265,lane:'o-down',owner:'opp'},
  {t:46.446,lane:'p-left',owner:'player'},
  {t:46.627,lane:'p-left',owner:'player'},
  {t:46.807,lane:'p-left',owner:'player'},
  {t:46.988,lane:'p-right',owner:'player'},
  {t:47.169,lane:'p-up',owner:'player'},
  {t:47.259,lane:'p-down',owner:'player'},
  {t:47.349,lane:'p-right',owner:'player'},
  {t:47.530,lane:'p-up',owner:'player'},
  {t:47.620,lane:'p-left',owner:'player'},
  {t:47.711,lane:'p-down',owner:'player'},
  {t:47.892,lane:'p-up',owner:'player'},
  {t:47.982,lane:'p-right',owner:'player'},
  {t:48.072,lane:'p-down',owner:'player'},
  {t:48.253,lane:'p-up',owner:'player'},
  {t:48.343,lane:'p-left',owner:'player'},
  {t:48.434,lane:'p-down',owner:'player'},
  {t:48.614,lane:'p-left',owner:'player'},
  {t:48.795,lane:'p-right',owner:'player'},
  {t:48.976,lane:'p-down',owner:'player'},
  {t:49.157,lane:'p-left',owner:'player'},
  {t:49.247,lane:'p-down',owner:'player'},
  {t:49.337,lane:'p-right',owner:'player'},
  {t:49.699,lane:'p-down',owner:'player'},
  {t:49.789,lane:'p-left',owner:'player'},
  {t:49.880,lane:'p-up',owner:'player'},
  {t:50.060,lane:'p-down',owner:'player'},
  {t:50.151,lane:'p-right',owner:'player'},
  {t:50.241,lane:'p-down',owner:'player'},
  {t:50.422,lane:'p-left',owner:'player'},
  {t:50.512,lane:'p-right',owner:'player'},
  {t:50.602,lane:'p-down',owner:'player'},
  {t:50.693,lane:'p-right',owner:'player'},
  {t:50.783,lane:'p-up',owner:'player'},
  {t:50.873,lane:'p-left',owner:'player'},
  {t:50.964,lane:'p-down',owner:'player'},
  {t:51.054,lane:'p-right',owner:'player'},
  {t:51.145,lane:'p-up',owner:'player'},
  {t:51.235,lane:'p-left',owner:'player'},
  {t:51.325,lane:'p-down',owner:'player'},
  {t:51.416,lane:'p-right',owner:'player'},
  {t:51.506,lane:'p-up',owner:'player'},
  {t:51.596,lane:'p-left',owner:'player'},
  {t:51.687,lane:'p-down',owner:'player'},
  {t:51.777,lane:'p-right',owner:'player'},
  {t:51.867,lane:'p-left',owner:'player'},
  {t:51.958,lane:'p-down',owner:'player'},
  {t:52.048,lane:'p-right',owner:'player'},
  {t:52.139,lane:'p-down',owner:'player'},
  {t:52.229,lane:'p-right',owner:'player'},
  {t:52.319,lane:'p-left',owner:'player'},
  {t:52.410,lane:'p-right',owner:'player'},
  {t:52.500,lane:'p-down',owner:'player'},
  {t:52.590,lane:'p-right',owner:'player'},
  {t:52.681,lane:'p-left',owner:'player'},
  {t:52.771,lane:'p-right',owner:'player'},
  {t:52.861,lane:'p-down',owner:'player'},
  {t:52.952,lane:'p-right',owner:'player'},
  {t:53.042,lane:'p-left',owner:'player'},
  {t:53.133,lane:'p-up',owner:'player'},
  {t:53.223,lane:'p-left',owner:'player'},
  {t:53.313,lane:'p-right',owner:'player'},
  {t:53.404,lane:'p-left',owner:'player'},
  {t:53.494,lane:'p-right',owner:'player'},
  {t:53.585,lane:'p-down',owner:'player'},
  {t:53.675,lane:'p-right',owner:'player'},
  {t:53.765,lane:'p-left',owner:'player'},
  {t:53.856,lane:'p-right',owner:'player'},
  {t:53.946,lane:'p-down',owner:'player'},
  {t:54.036,lane:'p-right',owner:'player'},
  {t:54.127,lane:'p-left',owner:'player'},
  {t:54.217,lane:'p-right',owner:'player'},
  {t:54.307,lane:'p-down',owner:'player'},
  {t:54.398,lane:'p-right',owner:'player'},
  {t:54.488,lane:'p-left',owner:'player'},
  {t:54.579,lane:'p-up',owner:'player'},
  {t:54.669,lane:'p-left',owner:'player'},
  {t:54.759,lane:'p-right',owner:'player'},
  {t:54.850,lane:'p-left',owner:'player'},
  {t:54.939,lane:'o-down',owner:'opp'},
  {t:54.940,lane:'p-right',owner:'player'},
  {t:55.031,lane:'p-down',owner:'player'},
  {t:55.120,lane:'o-right',owner:'opp'},
  {t:55.121,lane:'p-right',owner:'player'},
  {t:55.211,lane:'p-left',owner:'player'},
  {t:55.301,lane:'o-down',owner:'opp'},
  {t:55.302,lane:'p-right',owner:'player'},
  {t:55.392,lane:'p-down',owner:'player'},
  {t:55.482,lane:'o-left',owner:'opp'},
  {t:55.482,lane:'p-right',owner:'player'},
  {t:55.573,lane:'p-left',owner:'player'},
  {t:55.662,lane:'o-down',owner:'opp'},
  {t:55.663,lane:'p-right',owner:'player'},
  {t:55.753,lane:'p-down',owner:'player'},
  {t:55.844,lane:'p-right',owner:'player'},
  {t:55.934,lane:'p-left',owner:'player'},
  {t:56.025,lane:'p-up',owner:'player'},
  {t:56.115,lane:'p-left',owner:'player'},
  {t:56.205,lane:'p-right',owner:'player'},
  {t:56.295,lane:'p-left',owner:'player'},
  {t:56.385,lane:'o-left',owner:'opp'},
  {t:56.386,lane:'p-right',owner:'player'},
  {t:56.475,lane:'p-down',owner:'player'},
  {t:56.566,lane:'p-right',owner:'player'},
  {t:56.566,lane:'o-up',owner:'opp'},
  {t:56.656,lane:'p-left',owner:'player'},
  {t:56.746,lane:'p-right',owner:'player'},
  {t:56.747,lane:'o-right',owner:'opp'},
  {t:56.837,lane:'p-down',owner:'player'},
  {t:56.927,lane:'p-right',owner:'player'},
  {t:56.927,lane:'o-up',owner:'opp'},
  {t:57.018,lane:'p-left',owner:'player'},
  {t:57.108,lane:'o-left',owner:'opp'},
  {t:57.108,lane:'p-up',owner:'player'},
  {t:57.470,lane:'o-right',owner:'opp'},
  {t:57.470,lane:'p-right',owner:'player'},
  {t:57.831,lane:'o-down',owner:'opp'},
  {t:57.831,lane:'p-up',owner:'player'},
  {t:57.922,lane:'p-left',owner:'player'},
  {t:58.012,lane:'p-right',owner:'player'},
  {t:58.102,lane:'p-left',owner:'player'},
  {t:58.193,lane:'p-up',owner:'player'},
  {t:58.283,lane:'p-left',owner:'player'},
  {t:58.373,lane:'p-right',owner:'player'},
  {t:58.464,lane:'p-left',owner:'player'},
  {t:58.554,lane:'p-right',owner:'player'},
  {t:58.645,lane:'p-down',owner:'player'},
  {t:58.735,lane:'p-right',owner:'player'},
  {t:58.825,lane:'p-left',owner:'player'},
  {t:58.916,lane:'p-right',owner:'player'},
  {t:59.006,lane:'p-down',owner:'player'},
  {t:59.096,lane:'p-right',owner:'player'},
  {t:59.187,lane:'p-left',owner:'player'},
  {t:59.277,lane:'p-up',owner:'player'},
  {t:59.368,lane:'p-left',owner:'player'},
  {t:59.458,lane:'p-right',owner:'player'},
  {t:59.548,lane:'p-left',owner:'player'},
  {t:59.639,lane:'p-up',owner:'player'},
  {t:59.729,lane:'p-left',owner:'player'},
  {t:59.819,lane:'p-right',owner:'player'},
  {t:59.910,lane:'p-left',owner:'player'},
  {t:60.000,lane:'p-right',owner:'player'},
  {t:60.091,lane:'p-down',owner:'player'},
  {t:60.181,lane:'p-right',owner:'player'},
  {t:60.271,lane:'p-left',owner:'player'},
  {t:60.362,lane:'p-right',owner:'player'},
  {t:60.452,lane:'p-down',owner:'player'},
  {t:60.542,lane:'p-right',owner:'player'},
  {t:60.633,lane:'p-left',owner:'player'},
  {t:60.723,lane:'p-up',owner:'player'},
  {t:60.813,lane:'p-right',owner:'player'},
  {t:60.904,lane:'p-down',owner:'player'},
  {t:60.994,lane:'p-left',owner:'player'},
  {t:61.084,lane:'p-up',owner:'player'},
  {t:61.175,lane:'p-right',owner:'player'},
  {t:61.265,lane:'p-down',owner:'player'},
  {t:61.355,lane:'p-left',owner:'player'},
  {t:61.446,lane:'p-right',owner:'player'},
  {t:61.536,lane:'p-up',owner:'player'},
  {t:61.627,lane:'p-left',owner:'player'},
  {t:61.717,lane:'p-down',owner:'player'},
  {t:61.807,lane:'p-right',owner:'player'},
  {t:61.898,lane:'p-up',owner:'player'},
  {t:61.988,lane:'p-left',owner:'player'},
  {t:62.078,lane:'p-down',owner:'player'},
  {t:62.169,lane:'p-right',owner:'player'},
  {t:62.258,lane:'p-down',owner:'player'},
  {t:62.349,lane:'p-left',owner:'player'},
  {t:62.440,lane:'p-down',owner:'player'},
  {t:62.529,lane:'p-right',owner:'player'},
  {t:62.620,lane:'p-down',owner:'player'},
  {t:62.711,lane:'p-left',owner:'player'},
  {t:62.801,lane:'p-down',owner:'player'},
  {t:62.892,lane:'p-right',owner:'player'},
  {t:63.253,lane:'p-left',owner:'player'},
  {t:63.614,lane:'o-left',owner:'opp'},
  {t:63.614,lane:'p-up',owner:'player'},
  {t:63.795,lane:'o-down',owner:'opp'},
  {t:63.976,lane:'o-right',owner:'opp'},
  {t:64.156,lane:'o-left',owner:'opp'},
  {t:64.337,lane:'o-right',owner:'opp'},
  {t:64.518,lane:'o-down',owner:'opp'},
  {t:64.699,lane:'o-up',owner:'opp'},
  {t:64.880,lane:'o-right',owner:'opp'},
  {t:65.060,lane:'o-down',owner:'opp'},
  {t:65.241,lane:'o-right',owner:'opp'},
  {t:65.421,lane:'o-left',owner:'opp'},
  {t:65.602,lane:'o-left',owner:'opp'},
  {t:65.783,lane:'o-down',owner:'opp'},
  {t:66.144,lane:'o-up',owner:'opp'},
  {t:66.325,lane:'o-left',owner:'opp'},
  {t:66.506,lane:'p-right',owner:'player'},
  {t:66.687,lane:'p-up',owner:'player'},
  {t:66.777,lane:'p-left',owner:'player'},
  {t:66.867,lane:'p-down',owner:'player'},
  {t:67.048,lane:'p-right',owner:'player'},
  {t:67.229,lane:'p-down',owner:'player'},
  {t:67.591,lane:'p-up',owner:'player'},
  {t:67.772,lane:'p-right',owner:'player'},
  {t:67.952,lane:'p-left',owner:'player'},
  {t:67.998,lane:'p-down',owner:'player'},
  {t:68.133,lane:'p-right',owner:'player'},
  {t:68.223,lane:'p-up',owner:'player'},
  {t:68.313,lane:'p-left',owner:'player'},
  {t:68.494,lane:'p-right',owner:'player'},
  {t:68.584,lane:'p-down',owner:'player'},
  {t:68.675,lane:'p-up',owner:'player'},
  {t:68.855,lane:'p-left',owner:'player'},
  {t:68.946,lane:'p-right',owner:'player'},
  {t:69.036,lane:'p-left',owner:'player'},
  {t:69.081,lane:'p-down',owner:'player'},
  {t:69.217,lane:'p-up',owner:'player'},
  {t:69.397,lane:'o-up',owner:'opp'},
  {t:69.398,lane:'p-right',owner:'player'},
  {t:69.578,lane:'o-right',owner:'opp'},
  {t:69.668,lane:'o-down',owner:'opp'},
  {t:69.759,lane:'o-left',owner:'opp'},
  {t:69.939,lane:'o-down',owner:'opp'},
  {t:70.120,lane:'o-right',owner:'opp'},
  {t:70.120,lane:'p-up',owner:'player'},
  {t:70.211,lane:'p-left',owner:'player'},
  {t:70.301,lane:'o-down',owner:'opp'},
  {t:70.301,lane:'p-right',owner:'player'},
  {t:70.482,lane:'o-up',owner:'opp'},
  {t:70.482,lane:'p-up',owner:'player'},
  {t:70.662,lane:'o-down',owner:'opp'},
  {t:70.663,lane:'p-left',owner:'player'},
  {t:70.843,lane:'o-down',owner:'opp'},
  {t:70.843,lane:'p-down',owner:'player'},
  {t:70.933,lane:'o-up',owner:'opp'},
  {t:71.024,lane:'o-left',owner:'opp'},
  {t:71.204,lane:'o-right',owner:'opp'},
  {t:71.205,lane:'p-left',owner:'player'},
  {t:71.385,lane:'o-left',owner:'opp'},
  {t:71.386,lane:'p-right',owner:'player'},
  {t:71.566,lane:'o-down',owner:'opp'},
  {t:71.566,lane:'p-left',owner:'player'},
  {t:71.747,lane:'o-left',owner:'opp'},
  {t:71.747,lane:'p-left',owner:'player'},
  {t:71.927,lane:'o-right',owner:'opp'},
  {t:71.928,lane:'p-down',owner:'player'},
  {t:72.108,lane:'o-up',owner:'opp'},
  {t:72.108,lane:'p-down',owner:'player'},
  {t:72.289,lane:'o-down',owner:'opp'},
  {t:72.289,lane:'p-right',owner:'player'},
  {t:72.470,lane:'p-up',owner:'player'},
  {t:72.560,lane:'p-down',owner:'player'},
  {t:72.651,lane:'p-right',owner:'player'},
  {t:72.831,lane:'p-down',owner:'player'},
  {t:72.922,lane:'p-up',owner:'player'},
  {t:73.012,lane:'o-down',owner:'opp'},
  {t:73.012,lane:'p-left',owner:'player'},
  {t:73.193,lane:'p-down',owner:'player'},
  {t:73.283,lane:'p-up',owner:'player'},
  {t:73.373,lane:'p-down',owner:'player'},
  {t:73.554,lane:'p-up',owner:'player'},
  {t:73.645,lane:'p-right',owner:'player'},
  {t:73.735,lane:'o-down',owner:'opp'},
  {t:73.735,lane:'p-up',owner:'player'},
  {t:73.825,lane:'p-left',owner:'player'},
  {t:73.916,lane:'p-up',owner:'player'},
  {t:74.006,lane:'p-right',owner:'player'},
  {t:74.096,lane:'p-up',owner:'player'},
  {t:74.187,lane:'p-left',owner:'player'},
  {t:74.277,lane:'p-up',owner:'player'},
  {t:74.367,lane:'p-right',owner:'player'},
  {t:74.458,lane:'p-up',owner:'player'},
  {t:74.458,lane:'o-down',owner:'opp'},
  {t:74.548,lane:'p-left',owner:'player'},
  {t:74.639,lane:'p-up',owner:'player'},
  {t:74.729,lane:'p-right',owner:'player'},
  {t:74.819,lane:'p-up',owner:'player'},
  {t:74.910,lane:'p-left',owner:'player'},
  {t:75.000,lane:'p-up',owner:'player'},
  {t:75.090,lane:'p-right',owner:'player'},
  {t:75.180,lane:'o-left',owner:'opp'},
  {t:75.181,lane:'p-up',owner:'player'},
  {t:75.361,lane:'p-left',owner:'player'},
  {t:75.542,lane:'p-up',owner:'player'},
  {t:75.723,lane:'o-right',owner:'opp'},
  {t:75.723,lane:'p-right',owner:'player'},
  {t:75.903,lane:'o-down',owner:'opp'},
  {t:75.904,lane:'p-left',owner:'player'},
  {t:76.084,lane:'p-up',owner:'player'},
  {t:76.265,lane:'p-down',owner:'player'},
  {t:76.445,lane:'p-right',owner:'player'},
  {t:76.445,lane:'o-right',owner:'opp'},
  {t:76.626,lane:'p-down',owner:'player'},
  {t:76.626,lane:'o-left',owner:'opp'},
  {t:76.807,lane:'p-left',owner:'player'},
  {t:76.988,lane:'p-up',owner:'player'},
  {t:77.168,lane:'o-up',owner:'opp'},
  {t:77.168,lane:'p-down',owner:'player'},
  {t:77.349,lane:'p-right',owner:'player'},
  {t:77.349,lane:'o-right',owner:'opp'},
  {t:77.711,lane:'p-left',owner:'player'},
  {t:77.801,lane:'p-right',owner:'player'},
  {t:77.891,lane:'p-up',owner:'player'},
  {t:77.891,lane:'o-right',owner:'opp'},
  {t:77.982,lane:'p-right',owner:'player'},
  {t:78.072,lane:'o-down',owner:'opp'},
  {t:78.072,lane:'p-left',owner:'player'},
  {t:78.253,lane:'p-left',owner:'player'},
  {t:78.434,lane:'p-left',owner:'player'},
  {t:78.614,lane:'p-right',owner:'player'},
  {t:78.614,lane:'o-left',owner:'opp'},
  {t:78.795,lane:'p-up',owner:'player'},
  {t:78.795,lane:'o-up',owner:'opp'},
  {t:78.976,lane:'p-right',owner:'player'},
  {t:79.156,lane:'p-left',owner:'player'},
  {t:79.156,lane:'o-down',owner:'opp'},
  {t:79.337,lane:'p-right',owner:'player'},
  {t:79.518,lane:'p-down',owner:'player'},
  {t:79.518,lane:'o-right',owner:'opp'},
  {t:79.698,lane:'p-left',owner:'player'},
  {t:79.879,lane:'p-right',owner:'player'},
  {t:79.879,lane:'o-up',owner:'opp'},
  {t:80.060,lane:'p-left',owner:'player'},
  {t:80.241,lane:'o-left',owner:'opp'},
  {t:80.241,lane:'p-up',owner:'player'},
  {t:80.422,lane:'p-up',owner:'player'},
  {t:80.602,lane:'o-down',owner:'opp'},
  {t:80.602,lane:'p-down',owner:'player'},
  {t:80.783,lane:'p-down',owner:'player'},
  {t:80.964,lane:'p-right',owner:'player'},
  {t:80.964,lane:'o-down',owner:'opp'},
  {t:81.144,lane:'p-down',owner:'player'},
  {t:81.235,lane:'p-right',owner:'player'},
  {t:81.325,lane:'p-down',owner:'player'},
  {t:81.415,lane:'p-left',owner:'player'},
  {t:81.506,lane:'p-down',owner:'player'},
  {t:81.506,lane:'o-up',owner:'opp'},
  {t:81.596,lane:'p-right',owner:'player'},
  {t:81.686,lane:'p-down',owner:'player'},
  {t:81.686,lane:'o-right',owner:'opp'},
  {t:81.777,lane:'p-left',owner:'player'},
  {t:81.867,lane:'p-down',owner:'player'},
  {t:81.958,lane:'p-right',owner:'player'},
  {t:82.048,lane:'p-down',owner:'player'},
  {t:82.138,lane:'p-left',owner:'player'},
  {t:82.229,lane:'p-up',owner:'player'},
  {t:82.229,lane:'o-left',owner:'opp'},
  {t:82.319,lane:'p-right',owner:'player'},
  {t:82.409,lane:'o-up',owner:'opp'},
  {t:82.409,lane:'p-left',owner:'player'},
  {t:82.590,lane:'p-up',owner:'player'},
  {t:82.771,lane:'p-left',owner:'player'},
  {t:82.951,lane:'p-down',owner:'player'},
  {t:82.951,lane:'o-left',owner:'opp'},
  {t:83.132,lane:'p-right',owner:'player'},
  {t:83.132,lane:'o-up',owner:'opp'},
  {t:83.313,lane:'p-up',owner:'player'},
  {t:83.494,lane:'p-right',owner:'player'},
  {t:83.674,lane:'p-left',owner:'player'},
  {t:83.674,lane:'o-right',owner:'opp'},
  {t:83.855,lane:'p-down',owner:'player'},
  {t:83.855,lane:'o-down',owner:'opp'},
  {t:84.217,lane:'p-right',owner:'player'},
  {t:84.307,lane:'p-up',owner:'player'},
  {t:84.397,lane:'o-left',owner:'opp'},
  {t:84.398,lane:'p-down',owner:'player'},
  {t:84.488,lane:'p-left',owner:'player'},
  {t:84.578,lane:'o-right',owner:'opp'},
  {t:84.578,lane:'p-right',owner:'player'},
  {t:84.669,lane:'p-up',owner:'player'},
  {t:84.759,lane:'p-down',owner:'player'},
  {t:84.849,lane:'p-left',owner:'player'},
  {t:84.939,lane:'o-down',owner:'opp'},
  {t:84.940,lane:'p-down',owner:'player'},
  {t:85.030,lane:'p-up',owner:'player'},
  {t:85.120,lane:'p-right',owner:'player'},
  {t:85.211,lane:'p-up',owner:'player'},
  {t:85.301,lane:'o-right',owner:'opp'},
  {t:85.301,lane:'p-down',owner:'player'},
  {t:85.662,lane:'o-left',owner:'opp'},
  {t:85.662,lane:'p-left',owner:'player'},
  {t:86.024,lane:'o-up',owner:'opp'},
  {t:86.024,lane:'p-down',owner:'player'},
  {t:86.385,lane:'o-down',owner:'opp'},
  {t:86.385,lane:'p-right',owner:'player'},
  {t:86.476,lane:'p-down',owner:'player'},
  {t:86.566,lane:'p-left',owner:'player'},
  {t:86.656,lane:'p-up',owner:'player'},
  {t:86.747,lane:'p-right',owner:'player'},
  {t:86.747,lane:'o-left',owner:'opp'},
  {t:86.927,lane:'p-left',owner:'player'},
  {t:86.927,lane:'o-up',owner:'opp'},
  {t:87.108,lane:'p-up',owner:'player'},
  {t:87.108,lane:'o-right',owner:'opp'},
  {t:87.289,lane:'p-down',owner:'player'},
  {t:87.289,lane:'o-up',owner:'opp'},
  {t:87.379,lane:'o-left',owner:'opp'},
  {t:87.470,lane:'o-right',owner:'opp'},
  {t:87.470,lane:'p-down',owner:'player'},
  {t:87.650,lane:'p-right',owner:'player'},
  {t:87.831,lane:'p-up',owner:'player'},
  {t:87.831,lane:'o-down',owner:'opp'},
  {t:88.012,lane:'p-left',owner:'player'},
  {t:88.192,lane:'o-right',owner:'opp'},
  {t:88.192,lane:'p-right',owner:'player'},
  {t:88.373,lane:'p-up',owner:'player'},
  {t:88.554,lane:'p-left',owner:'player'},
  {t:88.554,lane:'o-down',owner:'opp'},
  {t:88.735,lane:'p-up',owner:'player'},
  {t:88.915,lane:'o-left',owner:'opp'},
  {t:88.915,lane:'p-right',owner:'player'},
  {t:89.096,lane:'p-down',owner:'player'},
  {t:89.277,lane:'o-right',owner:'opp'},
  {t:89.277,lane:'p-left',owner:'player'},
  {t:89.458,lane:'p-down',owner:'player'},
  {t:89.638,lane:'o-right',owner:'opp'},
  {t:89.638,lane:'p-up',owner:'player'},
  {t:89.683,lane:'o-down',owner:'opp'},
  {t:90.000,lane:'p-left',owner:'player'},
  {t:90.180,lane:'p-down',owner:'player'},
  {t:90.361,lane:'p-right',owner:'player'},
  {t:90.361,lane:'o-down',owner:'opp'},
  {t:90.723,lane:'p-left',owner:'player'},
  {t:90.903,lane:'p-up',owner:'player'},
  {t:91.084,lane:'o-down',owner:'opp'},
  {t:91.084,lane:'p-left',owner:'player'},
  {t:91.174,lane:'p-down',owner:'player'},
  {t:91.174,lane:'o-left',owner:'opp'},
  {t:91.265,lane:'o-up',owner:'opp'},
  {t:91.265,lane:'p-right',owner:'player'},
  {t:91.355,lane:'p-up',owner:'player'},
  {t:91.355,lane:'o-right',owner:'opp'},
  {t:91.445,lane:'p-left',owner:'player'},
  {t:91.445,lane:'o-up',owner:'opp'},
  {t:91.536,lane:'o-left',owner:'opp'},
  {t:91.536,lane:'p-down',owner:'player'},
  {t:91.626,lane:'o-up',owner:'opp'},
  {t:91.626,lane:'p-right',owner:'player'},
  {t:91.717,lane:'o-down',owner:'opp'},
  {t:91.717,lane:'p-up',owner:'player'},
  {t:91.807,lane:'p-left',owner:'player'},
  {t:91.807,lane:'o-right',owner:'opp'},
  {t:91.897,lane:'o-up',owner:'opp'},
  {t:91.988,lane:'p-down',owner:'player'},
  {t:91.988,lane:'o-down',owner:'opp'},
  {t:92.078,lane:'o-left',owner:'opp'},
  {t:92.168,lane:'p-right',owner:'player'},
  {t:92.168,lane:'o-right',owner:'opp'},
  {t:92.530,lane:'p-left',owner:'player'},
  {t:92.530,lane:'o-up',owner:'opp'},
  {t:92.711,lane:'p-up',owner:'player'},
  {t:92.891,lane:'p-right',owner:'player'},
  {t:93.072,lane:'p-left',owner:'player'},
  {t:93.072,lane:'o-left',owner:'opp'},
  {t:93.163,lane:'o-right',owner:'opp'},
  {t:93.253,lane:'p-up',owner:'player'},
  {t:93.253,lane:'o-down',owner:'opp'},
  {t:93.433,lane:'p-left',owner:'player'},
  {t:93.614,lane:'p-right',owner:'player'},
  {t:93.614,lane:'o-left',owner:'opp'},
  {t:93.795,lane:'p-up',owner:'player'},
  {t:93.976,lane:'o-down',owner:'opp'},
  {t:93.976,lane:'p-right',owner:'player'},
  {t:94.156,lane:'p-down',owner:'player'},
  {t:94.337,lane:'p-left',owner:'player'},
  {t:94.337,lane:'o-right',owner:'opp'},
  {t:94.518,lane:'p-up',owner:'player'},
  {t:94.698,lane:'o-down',owner:'opp'},
  {t:94.698,lane:'p-right',owner:'player'},
  {t:94.879,lane:'p-left',owner:'player'},
  {t:95.060,lane:'o-left',owner:'opp'},
  {t:95.060,lane:'p-right',owner:'player'},
  {t:95.241,lane:'p-down',owner:'player'},
  {t:95.421,lane:'o-right',owner:'opp'},
  {t:95.422,lane:'p-left',owner:'player'},
  {t:95.602,lane:'p-down',owner:'player'},
  {t:95.693,lane:'p-down',owner:'player'},
  {t:95.783,lane:'p-up',owner:'player'},
  {t:95.783,lane:'o-left',owner:'opp'},
  {t:95.828,lane:'p-right',owner:'player'},
  {t:95.964,lane:'p-left',owner:'player'},
  {t:96.054,lane:'p-right',owner:'player'},
  {t:96.144,lane:'p-down',owner:'player'},
  {t:96.144,lane:'o-right',owner:'opp'},
  {t:96.325,lane:'p-up',owner:'player'},
  {t:96.416,lane:'p-up',owner:'player'},
  {t:96.506,lane:'o-up',owner:'opp'},
  {t:96.506,lane:'p-left',owner:'player'},
  {t:96.686,lane:'p-down',owner:'player'},
  {t:96.867,lane:'o-down',owner:'opp'},
  {t:96.867,lane:'p-left',owner:'player'},
  {t:96.958,lane:'p-right',owner:'player'},
  {t:97.048,lane:'p-up',owner:'player'},
  {t:97.139,lane:'p-left',owner:'player'},
  {t:97.229,lane:'p-down',owner:'player'},
  {t:97.319,lane:'p-right',owner:'player'},
  {t:97.410,lane:'p-down',owner:'player'},
  {t:97.500,lane:'p-left',owner:'player'},
  {t:97.590,lane:'p-right',owner:'player'},
  {t:97.681,lane:'p-up',owner:'player'},
  {t:97.771,lane:'p-down',owner:'player'},
  {t:97.861,lane:'p-left',owner:'player'},
  {t:97.952,lane:'p-up',owner:'player'},
  {t:98.042,lane:'p-right',owner:'player'},
  {t:98.133,lane:'p-up',owner:'player'},
  {t:98.223,lane:'p-right',owner:'player'},
  {t:98.314,lane:'p-left',owner:'player'},
  {t:98.495,lane:'p-down',owner:'player'},
  {t:98.675,lane:'p-left',owner:'player'},
  {t:98.856,lane:'p-down',owner:'player'},
  {t:99.037,lane:'p-up',owner:'player'},
  {t:99.082,lane:'p-right',owner:'player'},
  {t:99.218,lane:'p-left',owner:'player'},
  {t:99.308,lane:'p-down',owner:'player'},
  {t:99.398,lane:'p-right',owner:'player'},
  {t:99.579,lane:'p-up',owner:'player'},
  {t:99.669,lane:'p-down',owner:'player'},
  {t:99.760,lane:'p-right',owner:'player'},
  {t:99.940,lane:'p-left',owner:'player'},
  {t:100.031,lane:'p-down',owner:'player'},
  {t:100.121,lane:'p-right',owner:'player'},
  {t:100.302,lane:'p-left',owner:'player'},
  {t:100.392,lane:'p-up',owner:'player'},
  {t:100.483,lane:'p-down',owner:'player'},
  {t:100.663,lane:'p-up',owner:'player'},
  {t:100.754,lane:'p-down',owner:'player'},
  {t:100.844,lane:'p-right',owner:'player'},
  {t:101.025,lane:'p-down',owner:'player'},
  {t:101.204,lane:'o-down',owner:'opp'},
  {t:101.205,lane:'p-left',owner:'player'},
  {t:101.385,lane:'o-right',owner:'opp'},
  {t:101.386,lane:'p-down',owner:'player'},
  {t:101.566,lane:'o-down',owner:'opp'},
  {t:101.567,lane:'p-left',owner:'player'},
  {t:101.747,lane:'o-left',owner:'opp'},
  {t:101.748,lane:'p-down',owner:'player'},
  {t:101.927,lane:'o-down',owner:'opp'},
  {t:101.928,lane:'p-up',owner:'player'},
  {t:101.974,lane:'p-right',owner:'player'},
  {t:102.109,lane:'p-left',owner:'player'},
  {t:102.199,lane:'p-down',owner:'player'},
  {t:102.290,lane:'p-right',owner:'player'},
  {t:102.471,lane:'p-left',owner:'player'},
  {t:102.560,lane:'p-right',owner:'player'},
  {t:102.650,lane:'o-left',owner:'opp'},
  {t:102.651,lane:'p-up',owner:'player'},
  {t:102.741,lane:'p-down',owner:'player'},
  {t:102.831,lane:'o-up',owner:'opp'},
  {t:102.831,lane:'p-right',owner:'player'},
  {t:102.922,lane:'p-left',owner:'player'},
  {t:103.012,lane:'o-right',owner:'opp'},
  {t:103.013,lane:'p-down',owner:'player'},
  {t:103.102,lane:'p-up',owner:'player'},
  {t:103.192,lane:'o-up',owner:'opp'},
  {t:103.193,lane:'p-left',owner:'player'},
  {t:103.283,lane:'p-right',owner:'player'},
  {t:103.373,lane:'o-left',owner:'opp'},
  {t:103.374,lane:'p-up',owner:'player'},
  {t:103.464,lane:'p-down',owner:'player'},
  {t:103.554,lane:'p-right',owner:'player'},
  {t:103.645,lane:'p-up',owner:'player'},
  {t:103.735,lane:'o-right',owner:'opp'},
  {t:103.736,lane:'p-left',owner:'player'},
  {t:103.825,lane:'p-up',owner:'player'},
  {t:103.916,lane:'p-right',owner:'player'},
  {t:104.096,lane:'o-down',owner:'opp'},
  {t:104.097,lane:'p-left',owner:'player'},
  {t:104.278,lane:'p-left',owner:'player'},
  {t:104.459,lane:'p-left',owner:'player'},
  {t:104.639,lane:'p-left',owner:'player'},
  {t:104.820,lane:'p-right',owner:'player'},
  {t:105.001,lane:'p-up',owner:'player'},
  {t:105.091,lane:'p-down',owner:'player'},
  {t:105.181,lane:'p-right',owner:'player'},
  {t:105.362,lane:'p-up',owner:'player'},
  {t:105.452,lane:'p-left',owner:'player'},
  {t:105.543,lane:'p-down',owner:'player'},
  {t:105.724,lane:'p-up',owner:'player'},
  {t:105.814,lane:'p-right',owner:'player'},
  {t:105.904,lane:'p-down',owner:'player'},
  {t:106.085,lane:'p-up',owner:'player'},
  {t:106.175,lane:'p-left',owner:'player'},
  {t:106.266,lane:'p-down',owner:'player'},
  {t:106.446,lane:'p-left',owner:'player'},
  {t:106.627,lane:'p-right',owner:'player'},
  {t:106.808,lane:'p-down',owner:'player'},
  {t:106.989,lane:'p-left',owner:'player'},
  {t:107.079,lane:'p-down',owner:'player'},
  {t:107.169,lane:'p-right',owner:'player'},
  {t:107.531,lane:'p-down',owner:'player'},
  {t:107.621,lane:'p-left',owner:'player'},
  {t:107.712,lane:'p-up',owner:'player'},
  {t:107.892,lane:'p-down',owner:'player'},
  {t:107.983,lane:'p-right',owner:'player'},
  {t:108.073,lane:'p-down',owner:'player'},
  {t:108.254,lane:'p-left',owner:'player'},
  {t:108.344,lane:'p-right',owner:'player'},
  {t:108.434,lane:'p-down',owner:'player'},
  {t:108.525,lane:'p-right',owner:'player'},
  {t:108.615,lane:'p-up',owner:'player'},
  {t:108.705,lane:'p-left',owner:'player'},
  {t:108.796,lane:'p-down',owner:'player'},
  {t:108.886,lane:'p-right',owner:'player'},
  {t:108.977,lane:'p-up',owner:'player'},
  {t:109.067,lane:'p-left',owner:'player'},
  {t:109.157,lane:'p-down',owner:'player'},
  {t:109.248,lane:'p-right',owner:'player'},
  {t:109.338,lane:'p-up',owner:'player'},
  {t:109.428,lane:'p-left',owner:'player'},
  {t:109.519,lane:'p-down',owner:'player'},
  {t:109.609,lane:'p-right',owner:'player'},
  {t:109.699,lane:'p-left',owner:'player'},
  {t:109.790,lane:'p-down',owner:'player'},
  {t:109.880,lane:'p-right',owner:'player'},
  {t:109.970,lane:'p-down',owner:'player'},
  {t:110.060,lane:'p-right',owner:'player'},
  {t:110.150,lane:'p-left',owner:'player'},
  {t:110.241,lane:'p-right',owner:'player'},
  {t:110.331,lane:'p-down',owner:'player'},
  {t:110.421,lane:'p-right',owner:'player'},
  {t:110.512,lane:'p-left',owner:'player'},
  {t:110.602,lane:'p-right',owner:'player'},
  {t:110.692,lane:'p-down',owner:'player'},
  {t:110.783,lane:'p-right',owner:'player'},
  {t:110.873,lane:'p-left',owner:'player'},
  {t:110.964,lane:'p-up',owner:'player'},
  {t:111.054,lane:'p-left',owner:'player'},
  {t:111.144,lane:'p-right',owner:'player'},
  {t:111.235,lane:'p-left',owner:'player'},
  {t:111.325,lane:'p-right',owner:'player'},
  {t:111.416,lane:'p-down',owner:'player'},
  {t:111.506,lane:'p-right',owner:'player'},
  {t:111.596,lane:'p-left',owner:'player'},
  {t:111.687,lane:'p-right',owner:'player'},
  {t:111.777,lane:'p-down',owner:'player'},
  {t:111.867,lane:'p-right',owner:'player'},
  {t:111.958,lane:'p-left',owner:'player'},
  {t:112.048,lane:'p-right',owner:'player'},
  {t:112.138,lane:'p-down',owner:'player'},
  {t:112.229,lane:'p-right',owner:'player'},
  {t:112.319,lane:'p-left',owner:'player'},
  {t:112.410,lane:'p-up',owner:'player'},
  {t:112.500,lane:'p-left',owner:'player'},
  {t:112.590,lane:'p-right',owner:'player'},
  {t:112.681,lane:'p-left',owner:'player'},
  {t:112.771,lane:'p-right',owner:'player'},
  {t:112.771,lane:'o-down',owner:'opp'},
  {t:112.862,lane:'p-down',owner:'player'},
  {t:112.952,lane:'p-right',owner:'player'},
  {t:112.952,lane:'o-right',owner:'opp'},
  {t:113.042,lane:'p-left',owner:'player'},
  {t:113.133,lane:'p-right',owner:'player'},
  {t:113.133,lane:'o-down',owner:'opp'},
  {t:113.223,lane:'p-down',owner:'player'},
  {t:113.313,lane:'p-right',owner:'player'},
  {t:113.314,lane:'o-left',owner:'opp'},
  {t:113.404,lane:'p-left',owner:'player'},
  {t:113.494,lane:'p-right',owner:'player'},
  {t:113.494,lane:'o-down',owner:'opp'},
  {t:113.584,lane:'p-down',owner:'player'},
  {t:113.675,lane:'p-right',owner:'player'},
  {t:113.765,lane:'p-left',owner:'player'},
  {t:113.856,lane:'p-up',owner:'player'},
  {t:113.946,lane:'p-left',owner:'player'},
  {t:114.036,lane:'p-right',owner:'player'},
  {t:114.126,lane:'p-left',owner:'player'},
  {t:114.217,lane:'p-right',owner:'player'},
  {t:114.217,lane:'o-left',owner:'opp'},
  {t:114.306,lane:'p-down',owner:'player'},
  {t:114.397,lane:'p-right',owner:'player'},
  {t:114.398,lane:'o-up',owner:'opp'},
  {t:114.487,lane:'p-left',owner:'player'},
  {t:114.577,lane:'p-right',owner:'player'},
  {t:114.579,lane:'o-right',owner:'opp'},
  {t:114.668,lane:'p-down',owner:'player'},
  {t:114.758,lane:'p-right',owner:'player'},
  {t:114.759,lane:'o-up',owner:'opp'},
  {t:114.849,lane:'p-left',owner:'player'},
  {t:114.939,lane:'p-up',owner:'player'},
  {t:114.940,lane:'o-left',owner:'opp'},
  {t:115.301,lane:'p-right',owner:'player'},
  {t:115.302,lane:'o-right',owner:'opp'},
  {t:115.662,lane:'p-up',owner:'player'},
  {t:115.663,lane:'o-down',owner:'opp'},
  {t:115.753,lane:'p-left',owner:'player'},
  {t:115.843,lane:'p-right',owner:'player'},
  {t:115.933,lane:'p-left',owner:'player'},
  {t:116.024,lane:'p-up',owner:'player'},
  {t:116.114,lane:'p-left',owner:'player'},
  {t:116.204,lane:'p-right',owner:'player'},
  {t:116.295,lane:'p-left',owner:'player'},
  {t:116.385,lane:'p-right',owner:'player'},
  {t:116.476,lane:'p-down',owner:'player'},
  {t:116.566,lane:'p-right',owner:'player'},
  {t:116.656,lane:'p-left',owner:'player'},
  {t:116.747,lane:'p-right',owner:'player'},
  {t:116.837,lane:'p-down',owner:'player'},
  {t:116.927,lane:'p-right',owner:'player'},
  {t:117.018,lane:'p-left',owner:'player'},
  {t:117.108,lane:'p-up',owner:'player'},
  {t:117.199,lane:'p-left',owner:'player'},
  {t:117.289,lane:'p-right',owner:'player'},
  {t:117.379,lane:'p-left',owner:'player'},
  {t:117.470,lane:'p-up',owner:'player'},
  {t:117.560,lane:'p-left',owner:'player'},
  {t:117.650,lane:'p-right',owner:'player'},
  {t:117.741,lane:'p-left',owner:'player'},
  {t:117.831,lane:'p-right',owner:'player'},
  {t:117.922,lane:'p-down',owner:'player'},
  {t:118.012,lane:'p-right',owner:'player'},
  {t:118.102,lane:'p-left',owner:'player'},
  {t:118.193,lane:'p-right',owner:'player'},
  {t:118.283,lane:'p-down',owner:'player'},
  {t:118.373,lane:'p-right',owner:'player'},
  {t:118.464,lane:'p-left',owner:'player'},
  {t:118.554,lane:'p-up',owner:'player'},
  {t:118.644,lane:'p-right',owner:'player'},
  {t:118.735,lane:'p-down',owner:'player'},
  {t:118.825,lane:'p-left',owner:'player'},
  {t:118.915,lane:'p-up',owner:'player'},
  {t:119.006,lane:'p-right',owner:'player'},
  {t:119.096,lane:'p-down',owner:'player'},
  {t:119.186,lane:'p-left',owner:'player'},
  {t:119.277,lane:'p-right',owner:'player'},
  {t:119.367,lane:'p-up',owner:'player'},
  {t:119.458,lane:'p-left',owner:'player'},
  {t:119.548,lane:'p-down',owner:'player'},
  {t:119.638,lane:'p-right',owner:'player'},
  {t:119.729,lane:'p-up',owner:'player'},
  {t:119.819,lane:'p-left',owner:'player'},
  {t:119.909,lane:'p-down',owner:'player'},
  {t:120.000,lane:'p-right',owner:'player'},
  {t:120.089,lane:'p-down',owner:'player'},
  {t:120.180,lane:'p-left',owner:'player'},
  {t:120.271,lane:'p-down',owner:'player'},
  {t:120.360,lane:'p-right',owner:'player'},
  {t:120.451,lane:'p-down',owner:'player'},
  {t:120.542,lane:'p-left',owner:'player'},
  {t:120.632,lane:'p-down',owner:'player'},
  {t:121.445,lane:'o-left',owner:'opp'},
  {t:121.446,lane:'p-right',owner:'player'},
  {t:121.536,lane:'p-down',owner:'player'},
  {t:121.626,lane:'o-down',owner:'opp'},
  {t:121.626,lane:'p-right',owner:'player'},
  {t:121.716,lane:'p-left',owner:'player'},
  {t:121.807,lane:'o-right',owner:'opp'},
  {t:121.807,lane:'p-right',owner:'player'},
  {t:121.897,lane:'p-down',owner:'player'},
  {t:121.987,lane:'o-left',owner:'opp'},
  {t:121.987,lane:'p-right',owner:'player'},
  {t:122.078,lane:'p-left',owner:'player'},
  {t:122.168,lane:'o-right',owner:'opp'},
  {t:122.168,lane:'p-right',owner:'player'},
  {t:122.258,lane:'p-down',owner:'player'},
  {t:122.349,lane:'o-down',owner:'opp'},
  {t:122.349,lane:'p-right',owner:'player'},
  {t:122.439,lane:'p-left',owner:'player'},
  {t:122.529,lane:'o-up',owner:'opp'},
  {t:122.530,lane:'p-up',owner:'player'},
  {t:122.620,lane:'p-left',owner:'player'},
  {t:122.710,lane:'o-right',owner:'opp'},
  {t:122.710,lane:'p-right',owner:'player'},
  {t:122.801,lane:'p-left',owner:'player'},
  {t:122.891,lane:'o-down',owner:'opp'},
  {t:122.891,lane:'p-right',owner:'player'},
  {t:122.982,lane:'p-down',owner:'player'},
  {t:123.072,lane:'o-right',owner:'opp'},
  {t:123.072,lane:'p-right',owner:'player'},
  {t:123.162,lane:'p-left',owner:'player'},
  {t:123.252,lane:'o-left',owner:'opp'},
  {t:123.253,lane:'p-right',owner:'player'},
  {t:123.343,lane:'p-down',owner:'player'},
  {t:123.433,lane:'o-left',owner:'opp'},
  {t:123.433,lane:'p-right',owner:'player'},
  {t:123.524,lane:'p-left',owner:'player'},
  {t:123.614,lane:'o-down',owner:'opp'},
  {t:123.614,lane:'p-right',owner:'player'},
  {t:123.704,lane:'p-down',owner:'player'},
  {t:123.795,lane:'p-right',owner:'player'},
  {t:123.885,lane:'p-left',owner:'player'},
  {t:123.975,lane:'o-up',owner:'opp'},
  {t:123.976,lane:'p-up',owner:'player'},
  {t:124.066,lane:'p-left',owner:'player'},
  {t:124.156,lane:'o-left',owner:'opp'},
  {t:124.156,lane:'p-right',owner:'player'},
  {t:124.247,lane:'p-left',owner:'player'},
  {t:124.337,lane:'p-right',owner:'player'},
  {t:124.428,lane:'p-down',owner:'player'},
  {t:124.518,lane:'p-right',owner:'player'},
  {t:124.608,lane:'p-left',owner:'player'},
  {t:124.699,lane:'p-right',owner:'player'},
  {t:124.789,lane:'p-down',owner:'player'},
  {t:124.879,lane:'p-right',owner:'player'},
  {t:124.970,lane:'p-left',owner:'player'},
  {t:125.060,lane:'p-right',owner:'player'},
  {t:125.150,lane:'p-down',owner:'player'},
  {t:125.241,lane:'p-right',owner:'player'},
  {t:125.331,lane:'p-left',owner:'player'},
  {t:125.422,lane:'p-up',owner:'player'},
  {t:125.512,lane:'p-left',owner:'player'},
  {t:125.602,lane:'p-right',owner:'player'},
  {t:125.692,lane:'p-left',owner:'player'},
  {t:125.783,lane:'p-right',owner:'player'},
  {t:125.872,lane:'p-down',owner:'player'},
  {t:125.963,lane:'p-right',owner:'player'},
  {t:126.053,lane:'p-left',owner:'player'},
  {t:126.143,lane:'p-right',owner:'player'},
  {t:126.234,lane:'p-down',owner:'player'},
  {t:126.324,lane:'p-right',owner:'player'},
  {t:126.415,lane:'p-left',owner:'player'},
  {t:126.505,lane:'p-up',owner:'player'},
  {t:126.867,lane:'p-left',owner:'player'},
  {t:127.228,lane:'o-up',owner:'opp'},
  {t:127.229,lane:'p-right',owner:'player'},
  {t:127.319,lane:'p-down',owner:'player'},
  {t:127.409,lane:'p-right',owner:'player'},
  {t:127.409,lane:'o-right',owner:'opp'},
  {t:127.499,lane:'p-left',owner:'player'},
  {t:127.499,lane:'o-down',owner:'opp'},
  {t:127.590,lane:'p-right',owner:'player'},
  {t:127.590,lane:'o-left',owner:'opp'},
  {t:127.680,lane:'p-down',owner:'player'},
  {t:127.770,lane:'p-right',owner:'player'},
  {t:127.770,lane:'o-down',owner:'opp'},
  {t:127.861,lane:'p-left',owner:'player'},
  {t:127.951,lane:'p-right',owner:'player'},
  {t:127.951,lane:'o-right',owner:'opp'},
  {t:128.041,lane:'p-down',owner:'player'},
  {t:128.132,lane:'p-right',owner:'player'},
  {t:128.132,lane:'o-down',owner:'opp'},
  {t:128.222,lane:'p-left',owner:'player'},
  {t:128.313,lane:'p-up',owner:'player'},
  {t:128.313,lane:'o-up',owner:'opp'},
  {t:128.403,lane:'p-left',owner:'player'},
  {t:128.493,lane:'p-right',owner:'player'},
  {t:128.493,lane:'o-down',owner:'opp'},
  {t:128.584,lane:'p-left',owner:'player'},
  {t:128.674,lane:'p-right',owner:'player'},
  {t:128.674,lane:'o-down',owner:'opp'},
  {t:128.764,lane:'o-up',owner:'opp'},
  {t:128.765,lane:'p-down',owner:'player'},
  {t:128.855,lane:'o-left',owner:'opp'},
  {t:128.855,lane:'p-right',owner:'player'},
  {t:128.945,lane:'p-left',owner:'player'},
  {t:129.035,lane:'o-right',owner:'opp'},
  {t:129.036,lane:'p-right',owner:'player'},
  {t:129.126,lane:'p-down',owner:'player'},
  {t:129.216,lane:'o-left',owner:'opp'},
  {t:129.216,lane:'p-right',owner:'player'},
  {t:129.307,lane:'p-left',owner:'player'},
  {t:129.397,lane:'o-down',owner:'opp'},
  {t:129.397,lane:'p-right',owner:'player'},
  {t:129.487,lane:'p-down',owner:'player'},
  {t:129.578,lane:'o-left',owner:'opp'},
  {t:129.578,lane:'p-right',owner:'player'},
  {t:129.668,lane:'p-left',owner:'player'},
  {t:129.758,lane:'o-right',owner:'opp'},
  {t:129.759,lane:'p-up',owner:'player'},
  {t:129.849,lane:'p-left',owner:'player'},
  {t:129.939,lane:'o-up',owner:'opp'},
  {t:129.939,lane:'p-right',owner:'player'},
  {t:130.030,lane:'p-left',owner:'player'},
  {t:130.120,lane:'o-down',owner:'opp'},
  {t:130.120,lane:'p-right',owner:'player'},
  {t:130.211,lane:'p-down',owner:'player'},
  {t:130.301,lane:'p-right',owner:'player'},
  {t:130.391,lane:'p-left',owner:'player'},
  {t:130.482,lane:'p-right',owner:'player'},
  {t:130.572,lane:'p-down',owner:'player'},
  {t:130.662,lane:'p-right',owner:'player'},
  {t:130.753,lane:'p-left',owner:'player'},
  {t:130.843,lane:'p-right',owner:'player'},
  {t:130.933,lane:'p-down',owner:'player'},
  {t:131.024,lane:'p-right',owner:'player'},
  {t:131.114,lane:'p-left',owner:'player'},
  {t:131.205,lane:'p-up',owner:'player'},
  {t:131.295,lane:'p-left',owner:'player'},
  {t:131.385,lane:'p-right',owner:'player'},
  {t:131.475,lane:'p-left',owner:'player'},
  {t:131.566,lane:'p-right',owner:'player'},
  {t:131.655,lane:'p-down',owner:'player'},
  {t:131.746,lane:'p-right',owner:'player'},
  {t:131.836,lane:'p-left',owner:'player'},
  {t:131.926,lane:'p-right',owner:'player'},
  {t:132.017,lane:'p-down',owner:'player'},
  {t:132.107,lane:'p-right',owner:'player'},
  {t:132.198,lane:'p-left',owner:'player'},
  {t:132.288,lane:'p-up',owner:'player'},
  {t:132.650,lane:'p-right',owner:'player'},
  {t:133.012,lane:'p-left',owner:'player'},
  {t:133.012,lane:'o-right',owner:'opp'}
];


// ---------- ゲーム本体（ここから置き換え） ----------

// 設定（px/sec と 秒単位）
const SPEED = 1050;        // ノーツ速度（px / 秒）
const OFFSET = 0.04;       // 音と譜面のズレ補正（秒）

// ===== 判定画像の表示設定（必要ならここを編集） =====
// ピクセル単位で幅を指定（ブラウザ幅に合わせる場合は小さめに）
const JUDGEMENT_IMAGE_WIDTH = 290; // px
// 判定画像の下からの位置（px）
const JUDGEMENT_IMAGE_BOTTOM_PX = 380; // px
// 最大幅（ビューポート比）
const JUDGEMENT_IMAGE_MAX_WIDTH = '80vw';

// ===== 判定ウィンドウ設定（秒） =====
const JUDGE = {
  SICK: 0.045,  // ±45ms
  GOOD: 0.09,   // ±90ms
  BAD: 0.135,   // ±135ms
  SHIT: 0.16    // ±160ms
};

let score = 0;
let combo = 0;
let maxCombo = 0;
let judgementCount = {
  SICK: 0,
  GOOD: 0,
  BAD: 0,
  SHIT: 0,
  MISS: 0
};

// 音声
const inst = new Audio("assets/music/Inst-erect.ogg");
const bf   = new Audio("assets/music/Voices-bf-dark-erect.ogg");
const opp  = new Audio("assets/music/Voices-spooky-dark-erect.ogg");
inst.volume = 0.9; bf.volume = 0.9; opp.volume = 0.9;

// MISS用の効果音（ランダム再生） - assets/sfx に移動
const missNoteFiles = ["assets/sfx/missnote1.ogg","assets/sfx/missnote2.ogg","assets/sfx/missnote3.ogg"];


// 状態
let running = false;
let notes = []; 
let rafId = null;

// レーン要素キャッシュ
const laneEls = {
  "p-left": document.querySelector('[data-lane="p-left"]'),
  "p-down": document.querySelector('[data-lane="p-down"]'),
  "p-up": document.querySelector('[data-lane="p-up"]'),
  "p-right": document.querySelector('[data-lane="p-right"]'),
  "o-left": document.querySelector('[data-lane="o-left"]'),
  "o-down": document.querySelector('[data-lane="o-down"]'),
  "o-up": document.querySelector('[data-lane="o-up"]'),
  "o-right": document.querySelector('[data-lane="o-right"]')
};

const TARGET_BOTTOM_PX = 0;

// ノーツ生成
function createNotesFromEmbedded() {
  Object.values(laneEls).forEach(l => { 
    if (l) l.querySelectorAll(".note").forEach(x=>x.remove()); 
  });

  notes = embeddedNotes.map(n => {
    const el = document.createElement("div");
    el.className = `note ${n.owner === "player" ? "player-note" : "opp-note"} ${n.lane}`;

    const obj = {
      time: Number(n.t),
      lane: n.lane,
      owner: n.owner,
      el: el,
      hit: false
    };

    const laneEl = laneEls[n.lane] || document.getElementById("game");
    laneEl.appendChild(el);

    el.style.position = "absolute";
    el.style.left = "0";
    el.style.display = "none";

    return obj;
  });
}

// ゲーム開始
async function startGame() {
  if (running) return;
  running = true;

    // ★ 操作説明を消す
  const howto = document.getElementById("howto");
  if (howto) howto.style.display = "none";
  
  console.log("Game starting...");

  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("combo").textContent = "Combo: 0x";

  createNotesFromEmbedded();

  document.getElementById("howto").style.display = "none";


  inst.currentTime = 0;
  bf.currentTime = 0;
  opp.currentTime = 0;

  try {
    await Promise.all([inst.play(), bf.play(), opp.play()]);
  } catch (err) {
    document.body.addEventListener("click", () => {
      inst.play(); bf.play(); opp.play();
    }, { once: true });
  }

  rafId = requestAnimationFrame(gameLoop);
}

function stopGame() {
  running = false;
  cancelAnimationFrame(rafId);
  inst.pause(); bf.pause(); opp.pause();
}

inst.addEventListener("ended", showResult);

// ===== ゲームループ =====
function gameLoop() {
  if (!running) return;

  const now = inst.currentTime + OFFSET;

  notes.forEach(n => {
    if (n.hit) return;

    const el = n.el;
    const diff = n.time - now;
    const y = TARGET_BOTTOM_PX + diff * SPEED;

    el.style.bottom = `${y}px`;
    el.style.display = (y > -200 && y < window.innerHeight + 200) ? "block" : "none";

    // ★ ノーツ通過で MISS（MISS++ が無かったバグ修正）
    if (!n.hit && n.owner === "player" && now - n.time > JUDGE.SHIT) {
      n.hit = true;
      n.el.remove();
      judgementCount.MISS++;   // ← 追加！！
      combo = 0;
      // MISS は表示なし、代わりにランダムな効果音を鳴らす
      playRandomMissNote();
      updateHUD();
    }

    // 相手側は自動削除
    if (n.owner === "opp" && diff < -0.01 && !n.hit) {
      n.hit = true;
      el.remove();
    }
  });

  rafId = requestAnimationFrame(gameLoop);
}

// ===== キー判定 =====
window.addEventListener("keydown", (e) => {

  if (e.code === "Enter") {
    if (!running) startGame();
    return;
  }

  const keyMap = {
    "KeyS": "p-left",
    "KeyD": "p-down",
    "KeyJ": "p-up",
    "KeyK": "p-right"
  };

  const lane = keyMap[e.code];
  if (!lane) return;

  const now = inst.currentTime + OFFSET;
  let candidate = null;
  let bestDiff = Infinity;

  // 近いノーツ検索
  for (const n of notes) {
    if (n.hit || n.lane !== lane || n.owner !== "player") continue;
    const diff = Math.abs(n.time - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      candidate = n;
    }
  }

  if (!candidate || bestDiff > JUDGE.SHIT) return;

  // === 判定 ===
  let judgement = "";
  let color = "#fff";
  let scoreAdd = 0;
  let keepCombo = true;

  if (bestDiff < JUDGE.SICK) {
    judgement = "SICK!";
    color = "#00ffff";
    scoreAdd = 500;
    judgementCount.SICK++;
    var judgementKey = "SICK";

  } else if (bestDiff < JUDGE.GOOD) {
    judgement = "GOOD";
    color = "#00ff00";
    scoreAdd = 300;
    judgementCount.GOOD++;
    var judgementKey = "GOOD";

  } else if (bestDiff < JUDGE.BAD) {
    judgement = "BAD";
    color = "#ffff00";
    scoreAdd = 100;
    judgementCount.BAD++;
    var judgementKey = "BAD";
    // BAD はコンボ継続としない（GOOD までがコンボ継続）
    keepCombo = false;
  } else {
    judgement = "SHIT";
    color = "#ff6600";
    keepCombo = false;
    judgementCount.SHIT++;
    var judgementKey = "SHIT";
  }

  candidate.hit = true;
  candidate.el.remove();

  if (keepCombo) {
    combo++;
    if (combo > maxCombo) maxCombo = combo;
  } else {
    combo = 0;
  }

  score += scoreAdd;
  // 判定表示は画像で行う（MISSはここでは発生しない）
  spawnJudgementImage(judgementKey);
  updateHUD();
});

// ===== 判定表示（画像） =====
function spawnJudgementImage(key) {
  // key: "SICK", "GOOD", "BAD", "SHIT"
  const mapping = {
    SICK: "assets/img/sick.png",
    GOOD: "assets/img/good.png",
    BAD: "assets/img/bad.png",
    SHIT: "assets/img/shit.png"
  };

  const src = mapping[key];
  if (!src) return;

  const effects = document.getElementById("effects");
  const el = document.createElement("img");
  el.src = src;
  el.alt = key;
  el.className = "judgement-img";

  // 判定ごとの個別設定（ここで上書きできます）
  const perKey = {
    SICK: { width: Math.round(JUDGEMENT_IMAGE_WIDTH * 1.15), bottom: JUDGEMENT_IMAGE_BOTTOM_PX },
    GOOD: { width: JUDGEMENT_IMAGE_WIDTH, bottom: JUDGEMENT_IMAGE_BOTTOM_PX },
    BAD:  { width: JUDGEMENT_IMAGE_WIDTH, bottom: JUDGEMENT_IMAGE_BOTTOM_PX - 30 },
    SHIT: { width: JUDGEMENT_IMAGE_WIDTH, bottom: JUDGEMENT_IMAGE_BOTTOM_PX - 55 }
  };

  const cfg = perKey[key] || { width: JUDGEMENT_IMAGE_WIDTH, bottom: JUDGEMENT_IMAGE_BOTTOM_PX };
  el.style.bottom = `${cfg.bottom}px`;
  el.style.width = `${cfg.width}px`;
  el.style.maxWidth = JUDGEMENT_IMAGE_MAX_WIDTH;
  el.style.height = "auto";
  effects.appendChild(el);

  el.animate([
    { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
    { opacity: 0, transform: "translate(-50%, -60%) scale(0.8)" }
  ], { duration: 600, easing: "ease-out" });

  setTimeout(() => el.remove(), 600);
}

// ===== MISS 効果音（ランダム） =====
function playRandomMissNote() {
  const idx = Math.floor(Math.random() * missNoteFiles.length);
  const file = missNoteFiles[idx];
  try {
    const a = new Audio(file);
    a.volume = 0.9;
    a.currentTime = 0;
    a.play().catch(() => {});
  } catch (e) {
    // 再生失敗は無視
  }
}

function updateHUD() {
  const scoreEl = document.getElementById("score");
  const comboEl = document.getElementById("combo");

  if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  if (comboEl) comboEl.textContent = `Combo: ${combo}x`;
}

// ===== リザルト =====
function showResult() {
  const result = document.getElementById("result");
  result.classList.remove("hidden");

  const totalNotes =
    judgementCount.SICK +
    judgementCount.GOOD +
    judgementCount.BAD +
    judgementCount.SHIT +
    judgementCount.MISS;

  const accuracy = totalNotes > 0
    ? ((judgementCount.SICK + judgementCount.GOOD) / totalNotes * 100).toFixed(2)
    : 0;

  document.getElementById("final-score").textContent = `Score: ${score}`;
  document.getElementById("final-accuracy").textContent = `Accuracy: ${accuracy}%`;
  const maxComboEl = document.getElementById("final-maxcombo");
  if (maxComboEl) maxComboEl.textContent = `Max Combo: ${maxCombo}`;
  document.getElementById("final-sick").textContent = `SICK!: ${judgementCount.SICK}`;
  document.getElementById("final-good").textContent = `GOOD: ${judgementCount.GOOD}`;
  document.getElementById("final-bad").textContent = `BAD: ${judgementCount.BAD}`;
  document.getElementById("final-shit").textContent = `SHIT: ${judgementCount.SHIT}`;
  document.getElementById("final-miss").textContent = `MISS: ${judgementCount.MISS}`;

  document.getElementById("retryBtn").onclick = () => {
    location.reload();
  };
}
