if (goog.DEBUG) console.log('PlumeData.js loading...');
goog.provide('testData.PlumeData');
// this is incomplete data.  Taken from elsewhere and truncated.
// testData.PlumeData = {
//   "Results": {
//     "callouts": [
//       {
//         "id": 3,
//         "label": "Ground Concentration;HPAC Radiation Deposition;19-Mar-10 17:22:00Z (60.0 min)<br/>Source: JEM<br/>Event: Event3",
//         "detailLabel": "Ground Concentration;HPAC Radiation Deposition;19-Mar-10 17:22:00Z (60.0 min)<br/>Source: JEM<br/>Event: Event3",
//         "lat": 32.8247,
//         "lon": -117.0893,
//         "levelTwoBody": "Ground Concentration;HPAC Radiation Deposition;19-Mar-10 17:22:00Z (60.0 min)<br/>-----<br/>Type Radiological Matl : Americium-241<br/>-----<br/>Location: 32.8247N 117.0893W  Altitude: 0 m AGL<br/>-----<br/>Date/Time: Fri Mar 19 16:22:00 GMT 2010<br/>-----<br/>Radiological Dispersion Weapon Detonation: Incident 1<br/>-----<br/><br/>Source: JEM",
//         "GeometryTag": true,
//         "attributes": [
//           [
//             "HEADER",
//             true
//           ],
//           [
//             "PLUMES",
//             [
//               {
//                 "id": 12,
//                 "label": "0.01 CI/M**2 - 0.01<br/>Source: JEM<br/>Event: Event3",
//                 "detailLabel": "0.01 CI/M**2 - 0.01<br/>Source: JEM<br/>Event: Event3",
//                 "lat": 32.823997,
//                 "lon": -117.05928,
//                 "alternateId": "12|12",
//                 "hasDetails": false,
//                 "GeometryTag": true,
//                 "attributes": [
//                   [
//                     "FILL",
//                     true
//                   ],
//                   [
//                     "COLOR",
//                     "008000"
//                   ]
//                 ],
//                 "polygonPoints": [
//                   {
//                     "latitude": 32.824394,
//                     "longitude": -117.08959
//                   },
//                   {
//                     "latitude": 32.824394,
//                     "longitude": -117.08959
//                   },
//                   {
//                     "latitude": 32.824394,
//                     "longitude": -117.08959
//                   }
//                 ],
//                 "circleLocation": {},
//                 "circleRadius": 0.0
//               },
//               {
//                 "id": 17,
//                 "label": "1000.0 CI/M**2 - 1000.0<br/>Source: JEM<br/>Event: Event3",
//                 "detailLabel": "1000.0 CI/M**2 - 1000.0<br/>Source: JEM<br/>Event: Event3",
//                 "lat": 32.824692,
//                 "lon": -117.08931,
//                 "alternateId": "17|17",
//                 "hasDetails": false,
//                 "GeometryTag": true,
//                 "attributes": [
//                   [
//                     "FILL",
//                     true
//                   ],
//                   [
//                     "COLOR",
//                     "ffafaf"
//                   ]
//                 ],
//                 "polygonPoints": [
//                   {
//                     "latitude": 32.824692,
//                     "longitude": -117.08931
//                   },
//                   {
//                     "latitude": 32.824692,
//                     "longitude": -117.08931
//                   },
//                   {
//                     "latitude": 32.824692,
//                     "longitude": -117.08931
//                   }
//                 ],
//                 "circleLocation": {},
//                 "circleRadius": 0.0
//               }
//             ]
//           ]
//         ],
//         "polygonPoints": [
//         ],
//         "circleLocation": {},
//         "circleRadius": 0.0
//       }
//     ],
//     "tracks": [
//     ]
//   }};


// testData.PlumeData = {
// "Results": {
//   "callouts": [
//     {
//       "id": 1,
//       "label": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
//       "detailLabel": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
//       "lat": 35.0,
//       "lon": -120.0,
//       "levelTwoBody": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>-----<br/>Location: 0S 0W  Altitude: 0 m AGL<br/>-----<br/>Date/Time: Fri Mar 19 16:11:21 GMT 2010<br/>-----<br/>Nuclear Weapon Detonation: Incident 1<br/>-----<br/><br/>Source: JEM",
//       "alternateId": "1|1",
//       "hasLevelTwo": true,
//       "hasDetails": false,
//       "GeometryTag": true,
//       "attributes": [
//         [
//           "HEADER",
//           true
//         ],
//         [
//           "PLUMES",
//           [
//             {
//               "id": 1,
//               "label": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
//               "lat": 34.997318,
//               "lon": -119.81619,
//               "alternateId": "1|1",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   false
//                 ],
//                 [
//                   "COLOR",
//                   "ff0000"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 34.978542,
//                   "longitude": -119.99999
//                 },
//                 {
//                   "latitude": 34.978542,
//                   "longitude": -119.99869
//                 },
//                 {
//                   "latitude": 34.978069,
//                   "longitude": -119.99783
//                 },
//                 {
//                   "latitude": 34.978069,
//                   "longitude": -119.99607
//                 },
//                 {
//                   "latitude": 34.97805,
//                   "longitude": -119.99523
//                 },
//                 {
//                   "latitude": 34.97805,
//                   "longitude": -119.99345
//                 },
//                 {
//                   "latitude": 34.9781,
//                   "longitude": -119.99256
//                 },
//                 {
//                   "latitude": 34.977589,
//                   "longitude": -119.99083
//                 },
//                 {
//                   "latitude": 34.977665,
//                   "longitude": -119.99036
//                 },
//                 {
//                   "latitude": 34.977531,
//                   "longitude": -119.9882
//                 },
//                 {
//                   "latitude": 34.977596,
//                   "longitude": -119.98781
//                 },
//                 {
//                   "latitude": 34.977818,
//                   "longitude": -119.98559
//                 },
//                 {
//                   "latitude": 34.977936,
//                   "longitude": -119.98486
//                 },
//                 {
//                   "latitude": 34.977509,
//                   "longitude": -119.98296
//                 },
//                 {
//                   "latitude": 34.977535,
//                   "longitude": -119.98263
//                 },
//                 {
//                   "latitude": 34.977688,
//                   "longitude": -119.98035
//                 },
//                 {
//                   "latitude": 34.977703,
//                   "longitude": -119.97984
//                 },
//                 {
//                   "latitude": 34.977192,
//                   "longitude": -119.97792
//                 },
//                 {
//                   "latitude": 34.977127,
//                   "longitude": -119.97778
//                 },
//                 {
//                   "latitude": 34.977119,
//                   "longitude": -119.97772
//                 },
//                 {
//                   "latitude": 34.977085,
//                   "longitude": -119.97521
//                 },
//                 {
//                   "latitude": 34.977058,
//                   "longitude": -119.97511
//                 },
//                 {
//                   "latitude": 34.977077,
//                   "longitude": -119.97477
//                 },
//                 {
//                   "latitude": 34.976719,
//                   "longitude": -119.97146
//                 },
//                 {
//                   "latitude": 34.976791,
//                   "longitude": -119.97087
//                 },
//                 {
//                   "latitude": 34.976791,
//                   "longitude": -119.97025
//                 },
//                 {
//                   "latitude": 34.976353,
//                   "longitude": -119.9697
//                 },
//                 {
//                   "latitude": 34.974854,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 34.974842,
//                   "longitude": -119.96691
//                 },
//                 {
//                   "latitude": 34.97451,
//                   "longitude": -119.96601
//                 },
//                 {
//                   "latitude": 34.974228,
//                   "longitude": -119.96471
//                 },
//                 {
//                   "latitude": 34.973942,
//                   "longitude": -119.96255
//                 },
//                 {
//                   "latitude": 34.973942,
//                   "longitude": -119.96181
//                 },
//                 {
//                   "latitude": 34.974117,
//                   "longitude": -119.95951
//                 },
//                 {
//                   "latitude": 34.97451,
//                   "longitude": -119.95718
//                 },
//                 {
//                   "latitude": 34.974613,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 34.974682,
//                   "longitude": -119.95659
//                 },
//                 {
//                   "latitude": 34.975197,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 34.977192,
//                   "longitude": -119.95167
//                 },
//                 {
//                   "latitude": 34.977287,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 34.97739,
//                   "longitude": -119.95132
//                 },
//                 {
//                   "latitude": 34.978615,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 34.979874,
//                   "longitude": -119.94685
//                 },
//                 {
//                   "latitude": 34.980145,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 34.980343,
//                   "longitude": -119.94582
//                 },
//                 {
//                   "latitude": 34.981178,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 34.982559,
//                   "longitude": -119.94108
//                 },
//                 {
//                   "latitude": 34.982571,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 34.982574,
//                   "longitude": -119.94102
//                 },
//                 {
//                   "latitude": 34.982674,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 34.982674,
//                   "longitude": -119.9383
//                 },
//                 {
//                   "latitude": 34.982731,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 34.982742,
//                   "longitude": -119.93561
//                 },
//                 {
//                   "latitude": 34.9827,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 34.982689,
//                   "longitude": -119.93304
//                 },
//                 {
//                   "latitude": 34.982559,
//                   "longitude": -119.93138
//                 },
//                 {
//                   "latitude": 34.982365,
//                   "longitude": -119.93074
//                 },
//                 {
//                   "latitude": 34.982178,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 34.980541,
//                   "longitude": -119.9299
//                 },
//                 {
//                   "latitude": 34.979874,
//                   "longitude": -119.9292
//                 },
//                 {
//                   "latitude": 34.978863,
//                   "longitude": -119.92826
//                 },
//                 {
//                   "latitude": 34.977837,
//                   "longitude": -119.92731
//                 },
//                 {
//                   "latitude": 34.975849,
//                   "longitude": -119.92496
//                 },
//                 {
//                   "latitude": 34.974648,
//                   "longitude": -119.92518
//                 },
//                 {
//                   "latitude": 34.970482,
//                   "longitude": -119.92601
//                 },
//                 {
//                   "latitude": 34.968739,
//                   "longitude": -119.92571
//                 },
//                 {
//                   "latitude": 34.966396,
//                   "longitude": -119.924
//                 },
//                 {
//                   "latitude": 34.965714,
//                   "longitude": -119.92342
//                 },
//                 {
//                   "latitude": 34.965118,
//                   "longitude": -119.92216
//                 },
//                 {
//                   "latitude": 34.964603,
//                   "longitude": -119.91927
//                 },
//                 {
//                   "latitude": 34.964603,
//                   "longitude": -119.91876
//                 },
//                 {
//                   "latitude": 34.964676,
//                   "longitude": -119.91396
//                 },
//                 {
//                   "latitude": 34.964676,
//                   "longitude": -119.91352
//                 },
//                 {
//                   "latitude": 34.965118,
//                   "longitude": -119.91068
//                 },
//                 {
//                   "latitude": 34.965977,
//                   "longitude": -119.90828
//                 },
//                 {
//                   "latitude": 34.970482,
//                   "longitude": -119.9037
//                 },
//                 {
//                   "latitude": 34.971684,
//                   "longitude": -119.90304
//                 },
//                 {
//                   "latitude": 34.975849,
//                   "longitude": -119.9003
//                 },
//                 {
//                   "latitude": 34.977245,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 34.980053,
//                   "longitude": -119.89369
//                 },
//                 {
//                   "latitude": 34.980789,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 34.981216,
//                   "longitude": -119.89164
//                 },
//                 {
//                   "latitude": 34.982353,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 34.982521,
//                   "longitude": -119.88604
//                 },
//                 {
//                   "latitude": 34.983097,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 34.983471,
//                   "longitude": -119.87988
//                 },
//                 {
//                   "latitude": 34.983677,
//                   "longitude": -119.87683
//                 },
//                 {
//                   "latitude": 34.983734,
//                   "longitude": -119.87437
//                 },
//                 {
//                   "latitude": 34.983776,
//                   "longitude": -119.87159
//                 },
//                 {
//                   "latitude": 34.984169,
//                   "longitude": -119.86871
//                 },
//                 {
//                   "latitude": 34.984173,
//                   "longitude": -119.86635
//                 },
//                 {
//                   "latitude": 34.984409,
//                   "longitude": -119.86323
//                 },
//                 {
//                   "latitude": 34.984402,
//                   "longitude": -119.86111
//                 },
//                 {
//                   "latitude": 34.985107,
//                   "longitude": -119.85731
//                 },
//                 {
//                   "latitude": 34.985146,
//                   "longitude": -119.85587
//                 },
//                 {
//                   "latitude": 34.986149,
//                   "longitude": -119.85105
//                 },
//                 {
//                   "latitude": 34.986183,
//                   "longitude": -119.85062
//                 },
//                 {
//                   "latitude": 34.986584,
//                   "longitude": -119.84933
//                 },
//                 {
//                   "latitude": 34.987247,
//                   "longitude": -119.84538
//                 },
//                 {
//                   "latitude": 34.987576,
//                   "longitude": -119.84441
//                 },
//                 {
//                   "latitude": 34.988434,
//                   "longitude": -119.84014
//                 },
//                 {
//                   "latitude": 34.989445,
//                   "longitude": -119.83735
//                 },
//                 {
//                   "latitude": 34.99004,
//                   "longitude": -119.8349
//                 },
//                 {
//                   "latitude": 34.991951,
//                   "longitude": -119.8297
//                 },
//                 {
//                   "latitude": 34.991978,
//                   "longitude": -119.82966
//                 },
//                 {
//                   "latitude": 34.992004,
//                   "longitude": -119.82961
//                 },
//                 {
//                   "latitude": 34.994434,
//                   "longitude": -119.82442
//                 },
//                 {
//                   "latitude": 34.996101,
//                   "longitude": -119.82037
//                 },
//                 {
//                   "latitude": 34.99654,
//                   "longitude": -119.81918
//                 },
//                 {
//                   "latitude": 34.997318,
//                   "longitude": -119.81619
//                 },
//                 {
//                   "latitude": 35.000374,
//                   "longitude": -119.81619
//                 },
//                 {
//                   "latitude": 35.002682,
//                   "longitude": -119.81619
//                 },
//                 {
//                   "latitude": 35.003342,
//                   "longitude": -119.81853
//                 },
//                 {
//                   "latitude": 35.00346,
//                   "longitude": -119.81918
//                 },
//                 {
//                   "latitude": 35.004837,
//                   "longitude": -119.82231
//                 },
//                 {
//                   "latitude": 35.005569,
//                   "longitude": -119.82442
//                 },
//                 {
//                   "latitude": 35.006481,
//                   "longitude": -119.82595
//                 },
//                 {
//                   "latitude": 35.00803,
//                   "longitude": -119.82966
//                 },
//                 {
//                   "latitude": 35.008038,
//                   "longitude": -119.82967
//                 },
//                 {
//                   "latitude": 35.008049,
//                   "longitude": -119.82969
//                 },
//                 {
//                   "latitude": 35.009651,
//                   "longitude": -119.83334
//                 },
//                 {
//                   "latitude": 35.009968,
//                   "longitude": -119.8349
//                 },
//                 {
//                   "latitude": 35.010983,
//                   "longitude": -119.83728
//                 },
//                 {
//                   "latitude": 35.011574,
//                   "longitude": -119.84014
//                 },
//                 {
//                   "latitude": 35.012096,
//                   "longitude": -119.84143
//                 },
//                 {
//                   "latitude": 35.012756,
//                   "longitude": -119.84538
//                 },
//                 {
//                   "latitude": 35.01292,
//                   "longitude": -119.84586
//                 },
//                 {
//                   "latitude": 35.013416,
//                   "longitude": -119.8493
//                 },
//                 {
//                   "latitude": 35.013786,
//                   "longitude": -119.85027
//                 },
//                 {
//                   "latitude": 35.013824,
//                   "longitude": -119.85062
//                 },
//                 {
//                   "latitude": 35.014771,
//                   "longitude": -119.85455
//                 },
//                 {
//                   "latitude": 35.014858,
//                   "longitude": -119.85587
//                 },
//                 {
//                   "latitude": 35.015556,
//                   "longitude": -119.85902
//                 },
//                 {
//                   "latitude": 35.015598,
//                   "longitude": -119.86111
//                 },
//                 {
//                   "latitude": 35.015831,
//                   "longitude": -119.86399
//                 },
//                 {
//                   "latitude": 35.015827,
//                   "longitude": -119.86635
//                 },
//                 {
//                   "latitude": 35.01622,
//                   "longitude": -119.86885
//                 },
//                 {
//                   "latitude": 35.016224,
//                   "longitude": -119.87159
//                 },
//                 {
//                   "latitude": 35.016285,
//                   "longitude": -119.87403
//                 },
//                 {
//                   "latitude": 35.016323,
//                   "longitude": -119.87683
//                 },
//                 {
//                   "latitude": 35.016708,
//                   "longitude": -119.87886
//                 },
//                 {
//                   "latitude": 35.016903,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 35.017117,
//                   "longitude": -119.88371
//                 },
//                 {
//                   "latitude": 35.017651,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 35.017933,
//                   "longitude": -119.88815
//                 },
//                 {
//                   "latitude": 35.018784,
//                   "longitude": -119.89159
//                 },
//                 {
//                   "latitude": 35.019131,
//                   "longitude": -119.89222
//                 },
//                 {
//                   "latitude": 35.01923,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 35.021324,
//                   "longitude": -119.89532
//                 },
//                 {
//                   "latitude": 35.022785,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 35.023304,
//                   "longitude": -119.89862
//                 },
//                 {
//                   "latitude": 35.024151,
//                   "longitude": -119.90025
//                 },
//                 {
//                   "latitude": 35.025814,
//                   "longitude": -119.90141
//                 },
//                 {
//                   "latitude": 35.028423,
//                   "longitude": -119.90304
//                 },
//                 {
//                   "latitude": 35.029079,
//                   "longitude": -119.90347
//                 },
//                 {
//                   "latitude": 35.029518,
//                   "longitude": -119.90364
//                 },
//                 {
//                   "latitude": 35.031895,
//                   "longitude": -119.90596
//                 },
//                 {
//                   "latitude": 35.034073,
//                   "longitude": -119.90828
//                 },
//                 {
//                   "latitude": 35.034328,
//                   "longitude": -119.90882
//                 },
//                 {
//                   "latitude": 35.034882,
//                   "longitude": -119.91055
//                 },
//                 {
//                   "latitude": 35.035725,
//                   "longitude": -119.9127
//                 },
//                 {
//                   "latitude": 35.035339,
//                   "longitude": -119.91352
//                 },
//                 {
//                   "latitude": 35.035385,
//                   "longitude": -119.91827
//                 },
//                 {
//                   "latitude": 35.035385,
//                   "longitude": -119.91876
//                 },
//                 {
//                   "latitude": 35.034882,
//                   "longitude": -119.9221
//                 },
//                 {
//                   "latitude": 35.033546,
//                   "longitude": -119.924
//                 },
//                 {
//                   "latitude": 35.029518,
//                   "longitude": -119.92596
//                 },
//                 {
//                   "latitude": 35.027821,
//                   "longitude": -119.92566
//                 },
//                 {
//                   "latitude": 35.024151,
//                   "longitude": -119.92492
//                 },
//                 {
//                   "latitude": 35.020668,
//                   "longitude": -119.92811
//                 },
//                 {
//                   "latitude": 35.020126,
//                   "longitude": -119.92865
//                 },
//                 {
//                   "latitude": 35.017742,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 35.017441,
//                   "longitude": -119.9313
//                 },
//                 {
//                   "latitude": 35.017296,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 35.017307,
//                   "longitude": -119.9333
//                 },
//                 {
//                   "latitude": 35.017269,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 35.017269,
//                   "longitude": -119.93596
//                 },
//                 {
//                   "latitude": 35.017326,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 35.017342,
//                   "longitude": -119.93851
//                 },
//                 {
//                   "latitude": 35.017433,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 35.017433,
//                   "longitude": -119.94104
//                 },
//                 {
//                   "latitude": 35.017441,
//                   "longitude": -119.94106
//                 },
//                 {
//                   "latitude": 35.018585,
//                   "longitude": -119.94254
//                 },
//                 {
//                   "latitude": 35.018845,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 35.019253,
//                   "longitude": -119.94451
//                 },
//                 {
//                   "latitude": 35.019867,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 35.019951,
//                   "longitude": -119.94644
//                 },
//                 {
//                   "latitude": 35.020126,
//                   "longitude": -119.94683
//                 },
//                 {
//                   "latitude": 35.020985,
//                   "longitude": -119.94806
//                 },
//                 {
//                   "latitude": 35.0214,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 35.0219,
//                   "longitude": -119.94978
//                 },
//                 {
//                   "latitude": 35.022732,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 35.022755,
//                   "longitude": -119.95157
//                 },
//                 {
//                   "latitude": 35.022808,
//                   "longitude": -119.95164
//                 },
//                 {
//                   "latitude": 35.024353,
//                   "longitude": -119.95263
//                 },
//                 {
//                   "latitude": 35.02499,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 35.025173,
//                   "longitude": -119.95445
//                 },
//                 {
//                   "latitude": 35.025452,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 35.025452,
//                   "longitude": -119.95679
//                 },
//                 {
//                   "latitude": 35.02549,
//                   "longitude": -119.95692
//                 },
//                 {
//                   "latitude": 35.025967,
//                   "longitude": -119.95892
//                 },
//                 {
//                   "latitude": 35.025894,
//                   "longitude": -119.95951
//                 },
//                 {
//                   "latitude": 35.026077,
//                   "longitude": -119.96181
//                 },
//                 {
//                   "latitude": 35.025787,
//                   "longitude": -119.96433
//                 },
//                 {
//                   "latitude": 35.025787,
//                   "longitude": -119.96472
//                 },
//                 {
//                   "latitude": 35.02549,
//                   "longitude": -119.96605
//                 },
//                 {
//                   "latitude": 35.025146,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 35.023647,
//                   "longitude": -119.9697
//                 },
//                 {
//                   "latitude": 35.023205,
//                   "longitude": -119.97087
//                 },
//                 {
//                   "latitude": 35.023277,
//                   "longitude": -119.97146
//                 },
//                 {
//                   "latitude": 35.023277,
//                   "longitude": -119.97203
//                 },
//                 {
//                   "latitude": 35.022728,
//                   "longitude": -119.97595
//                 },
//                 {
//                   "latitude": 35.022659,
//                   "longitude": -119.9769
//                 },
//                 {
//                   "latitude": 35.022694,
//                   "longitude": -119.97784
//                 },
//                 {
//                   "latitude": 35.02235,
//                   "longitude": -119.98107
//                 },
//                 {
//                   "latitude": 35.022442,
//                   "longitude": -119.98222
//                 },
//                 {
//                   "latitude": 35.022659,
//                   "longitude": -119.98312
//                 },
//                 {
//                   "latitude": 35.022404,
//                   "longitude": -119.98633
//                 },
//                 {
//                   "latitude": 35.022602,
//                   "longitude": -119.9874
//                 },
//                 {
//                   "latitude": 35.022789,
//                   "longitude": -119.98823
//                 },
//                 {
//                   "latitude": 35.022789,
//                   "longitude": -119.9917
//                 },
//                 {
//                   "latitude": 35.022865,
//                   "longitude": -119.99256
//                 },
//                 {
//                   "latitude": 35.022831,
//                   "longitude": -119.99343
//                 },
//                 {
//                   "latitude": 35.022831,
//                   "longitude": -119.99696
//                 },
//                 {
//                   "latitude": 35.022121,
//                   "longitude": -119.99804
//                 },
//                 {
//                   "latitude": 35.020126,
//                   "longitude": -120.00002
//                 },
//                 {
//                   "latitude": 35.019287,
//                   "longitude": -120.00131
//                 },
//                 {
//                   "latitude": 35.018951,
//                   "longitude": -120.00246
//                 },
//                 {
//                   "latitude": 35.018951,
//                   "longitude": -120.00393
//                 },
//                 {
//                   "latitude": 35.017441,
//                   "longitude": -120.00594
//                 },
//                 {
//                   "latitude": 35.017086,
//                   "longitude": -120.00655
//                 },
//                 {
//                   "latitude": 35.016632,
//                   "longitude": -120.00734
//                 },
//                 {
//                   "latitude": 35.016052,
//                   "longitude": -120.00917
//                 },
//                 {
//                   "latitude": 35.014759,
//                   "longitude": -120.0106
//                 },
//                 {
//                   "latitude": 35.014183,
//                   "longitude": -120.0118
//                 },
//                 {
//                   "latitude": 35.012074,
//                   "longitude": -120.01393
//                 },
//                 {
//                   "latitude": 35.011623,
//                   "longitude": -120.01441
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -120.0166
//                 },
//                 {
//                   "latitude": 35.008614,
//                   "longitude": -120.01704
//                 },
//                 {
//                   "latitude": 35.00671,
//                   "longitude": -120.0188
//                 },
//                 {
//                   "latitude": 35.004627,
//                   "longitude": -120.01907
//                 },
//                 {
//                   "latitude": 35.004025,
//                   "longitude": -120.01936
//                 },
//                 {
//                   "latitude": 35.001442,
//                   "longitude": -120.01965
//                 },
//                 {
//                   "latitude": 35.001343,
//                   "longitude": -120.0197
//                 },
//                 {
//                   "latitude": 35.001293,
//                   "longitude": -120.0197
//                 },
//                 {
//                   "latitude": 34.998657,
//                   "longitude": -120.0197
//                 },
//                 {
//                   "latitude": 34.998611,
//                   "longitude": -120.0197
//                 },
//                 {
//                   "latitude": 34.998558,
//                   "longitude": -120.01965
//                 },
//                 {
//                   "latitude": 34.996227,
//                   "longitude": -120.01941
//                 },
//                 {
//                   "latitude": 34.995975,
//                   "longitude": -120.01936
//                 },
//                 {
//                   "latitude": 34.993755,
//                   "longitude": -120.0192
//                 },
//                 {
//                   "latitude": 34.99329,
//                   "longitude": -120.0188
//                 },
//                 {
//                   "latitude": 34.991638,
//                   "longitude": -120.01865
//                 },
//                 {
//                   "latitude": 34.991386,
//                   "longitude": -120.01704
//                 },
//                 {
//                   "latitude": 34.990891,
//                   "longitude": -120.01676
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -120.0166
//                 },
//                 {
//                   "latitude": 34.988533,
//                   "longitude": -120.01644
//                 },
//                 {
//                   "latitude": 34.988377,
//                   "longitude": -120.01441
//                 },
//                 {
//                   "latitude": 34.988213,
//                   "longitude": -120.01413
//                 },
//                 {
//                   "latitude": 34.987926,
//                   "longitude": -120.01393
//                 },
//                 {
//                   "latitude": 34.985931,
//                   "longitude": -120.01374
//                 },
//                 {
//                   "latitude": 34.985813,
//                   "longitude": -120.0118
//                 },
//                 {
//                   "latitude": 34.985626,
//                   "longitude": -120.01142
//                 },
//                 {
//                   "latitude": 34.985241,
//                   "longitude": -120.0106
//                 },
//                 {
//                   "latitude": 34.983974,
//                   "longitude": -120.01041
//                 },
//                 {
//                   "latitude": 34.983944,
//                   "longitude": -120.00917
//                 },
//                 {
//                   "latitude": 34.983295,
//                   "longitude": -120.00845
//                 },
//                 {
//                   "latitude": 34.982914,
//                   "longitude": -120.00655
//                 },
//                 {
//                   "latitude": 34.982815,
//                   "longitude": -120.0063
//                 },
//                 {
//                   "latitude": 34.982559,
//                   "longitude": -120.00595
//                 },
//                 {
//                   "latitude": 34.981083,
//                   "longitude": -120.00537
//                 },
//                 {
//                   "latitude": 34.981049,
//                   "longitude": -120.00393
//                 },
//                 {
//                   "latitude": 34.980713,
//                   "longitude": -120.00311
//                 },
//                 {
//                   "latitude": 34.980713,
//                   "longitude": -120.00131
//                 },
//                 {
//                   "latitude": 34.980556,
//                   "longitude": -120.00065
//                 },
//                 {
//                   "latitude": 34.979874,
//                   "longitude": -120.00002
//                 },
//                 {
//                   "latitude": 34.978542,
//                   "longitude": -119.99999
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             },
//             {
//               "id": 2,
//               "label": "10.0 % (P) - 10% - Expected Population: 21<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "10.0 % (P) - 10% - Expected Population: 21<br/>Source: JEM<br/>Event: Event1",
//               "lat": 34.997318,
//               "lon": -119.81929,
//               "alternateId": "2|2",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   true
//                 ],
//                 [
//                   "COLOR",
//                   "00ff00"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 34.990345,
//                   "longitude": -120.01467
//                 },
//                 {
//                   "latitude": 34.990242,
//                   "longitude": -120.01441
//                 },
//                 {
//                   "latitude": 34.988682,
//                   "longitude": -120.01368
//                 },
//                 {
//                   "latitude": 34.988102,
//                   "longitude": -120.0118
//                 },
//                 {
//                   "latitude": 34.988007,
//                   "longitude": -120.01171
//                 },
//                 {
//                   "latitude": 34.987926,
//                   "longitude": -120.01147
//                 },
//                 {
//                   "latitude": 34.986557,
//                   "longitude": -120.01051
//                 },
//                 {
//                   "latitude": 34.986362,
//                   "longitude": -120.00917
//                 },
//                 {
//                   "latitude": 34.985847,
//                   "longitude": -120.00858
//                 },
//                 {
//                   "latitude": 34.985516,
//                   "longitude": -120.00655
//                 },
//                 {
//                   "latitude": 34.985424,
//                   "longitude": -120.00637
//                 },
//                 {
//                   "latitude": 34.985241,
//                   "longitude": -120.00467
//                 },
//                 {
//                   "latitude": 34.984997,
//                   "longitude": -120.00417
//                 },
//                 {
//                   "latitude": 34.98497,
//                   "longitude": -120.00393
//                 },
//                 {
//                   "latitude": 34.984463,
//                   "longitude": -120.00207
//                 },
//                 {
//                   "latitude": 34.984428,
//                   "longitude": -120.00131
//                 },
//                 {
//                   "latitude": 34.984413,
//                   "longitude": -119.9995
//                 },
//                 {
//                   "latitude": 34.984413,
//                   "longitude": -119.99869
//                 },
//                 {
//                   "latitude": 34.984871,
//                   "longitude": -119.99643
//                 },
//                 {
//                   "latitude": 34.98489,
//                   "longitude": -119.99607
//                 },
//                 {
//                   "latitude": 34.985241,
//                   "longitude": -119.99503
//                 },
//                 {
//                   "latitude": 34.985447,
//                   "longitude": -119.99345
//                 },
//                 {
//                   "latitude": 34.985619,
//                   "longitude": -119.99308
//                 },
//                 {
//                   "latitude": 34.98608,
//                   "longitude": -119.99083
//                 },
//                 {
//                   "latitude": 34.986752,
//                   "longitude": -119.98936
//                 },
//                 {
//                   "latitude": 34.986916,
//                   "longitude": -119.9882
//                 },
//                 {
//                   "latitude": 34.987816,
//                   "longitude": -119.98569
//                 },
//                 {
//                   "latitude": 34.987839,
//                   "longitude": -119.98559
//                 },
//                 {
//                   "latitude": 34.987919,
//                   "longitude": -119.98297
//                 },
//                 {
//                   "latitude": 34.987919,
//                   "longitude": -119.98296
//                 },
//                 {
//                   "latitude": 34.987926,
//                   "longitude": -119.9827
//                 },
//                 {
//                   "latitude": 34.987949,
//                   "longitude": -119.98035
//                 },
//                 {
//                   "latitude": 34.987946,
//                   "longitude": -119.98032
//                 },
//                 {
//                   "latitude": 34.987926,
//                   "longitude": -119.98014
//                 },
//                 {
//                   "latitude": 34.987331,
//                   "longitude": -119.9783
//                 },
//                 {
//                   "latitude": 34.987278,
//                   "longitude": -119.97772
//                 },
//                 {
//                   "latitude": 34.987099,
//                   "longitude": -119.97591
//                 },
//                 {
//                   "latitude": 34.987026,
//                   "longitude": -119.97511
//                 },
//                 {
//                   "latitude": 34.986683,
//                   "longitude": -119.97369
//                 },
//                 {
//                   "latitude": 34.986591,
//                   "longitude": -119.97248
//                 },
//                 {
//                   "latitude": 34.986526,
//                   "longitude": -119.97123
//                 },
//                 {
//                   "latitude": 34.98642,
//                   "longitude": -119.96986
//                 },
//                 {
//                   "latitude": 34.98621,
//                   "longitude": -119.96892
//                 },
//                 {
//                   "latitude": 34.986115,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 34.986099,
//                   "longitude": -119.96641
//                 },
//                 {
//                   "latitude": 34.985989,
//                   "longitude": -119.96462
//                 },
//                 {
//                   "latitude": 34.985905,
//                   "longitude": -119.96397
//                 },
//                 {
//                   "latitude": 34.985832,
//                   "longitude": -119.962
//                 },
//                 {
//                   "latitude": 34.985828,
//                   "longitude": -119.96143
//                 },
//                 {
//                   "latitude": 34.985744,
//                   "longitude": -119.95938
//                 },
//                 {
//                   "latitude": 34.98571,
//                   "longitude": -119.95892
//                 },
//                 {
//                   "latitude": 34.985634,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 34.985626,
//                   "longitude": -119.95638
//                 },
//                 {
//                   "latitude": 34.985565,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 34.985542,
//                   "longitude": -119.95384
//                 },
//                 {
//                   "latitude": 34.985512,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 34.985504,
//                   "longitude": -119.95126
//                 },
//                 {
//                   "latitude": 34.985428,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 34.985413,
//                   "longitude": -119.94873
//                 },
//                 {
//                   "latitude": 34.985336,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 34.985332,
//                   "longitude": -119.94618
//                 },
//                 {
//                   "latitude": 34.985325,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 34.985317,
//                   "longitude": -119.94358
//                 },
//                 {
//                   "latitude": 34.985317,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 34.985317,
//                   "longitude": -119.94096
//                 },
//                 {
//                   "latitude": 34.985241,
//                   "longitude": -119.93929
//                 },
//                 {
//                   "latitude": 34.985165,
//                   "longitude": -119.93849
//                 },
//                 {
//                   "latitude": 34.985161,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 34.984879,
//                   "longitude": -119.93614
//                 },
//                 {
//                   "latitude": 34.984863,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 34.984913,
//                   "longitude": -119.93349
//                 },
//                 {
//                   "latitude": 34.984905,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 34.984756,
//                   "longitude": -119.93102
//                 },
//                 {
//                   "latitude": 34.984734,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 34.984303,
//                   "longitude": -119.92885
//                 },
//                 {
//                   "latitude": 34.984097,
//                   "longitude": -119.92793
//                 },
//                 {
//                   "latitude": 34.983887,
//                   "longitude": -119.92664
//                 },
//                 {
//                   "latitude": 34.983746,
//                   "longitude": -119.92532
//                 },
//                 {
//                   "latitude": 34.983852,
//                   "longitude": -119.92405
//                 },
//                 {
//                   "latitude": 34.983829,
//                   "longitude": -119.92269
//                 },
//                 {
//                   "latitude": 34.983822,
//                   "longitude": -119.92146
//                 },
//                 {
//                   "latitude": 34.983761,
//                   "longitude": -119.92007
//                 },
//                 {
//                   "latitude": 34.983589,
//                   "longitude": -119.91907
//                 },
//                 {
//                   "latitude": 34.983315,
//                   "longitude": -119.91745
//                 },
//                 {
//                   "latitude": 34.983238,
//                   "longitude": -119.91679
//                 },
//                 {
//                   "latitude": 34.982918,
//                   "longitude": -119.91408
//                 },
//                 {
//                   "latitude": 34.983036,
//                   "longitude": -119.91293
//                 },
//                 {
//                   "latitude": 34.983219,
//                   "longitude": -119.91157
//                 },
//                 {
//                   "latitude": 34.983192,
//                   "longitude": -119.90892
//                 },
//                 {
//                   "latitude": 34.982994,
//                   "longitude": -119.9077
//                 },
//                 {
//                   "latitude": 34.983185,
//                   "longitude": -119.90636
//                 },
//                 {
//                   "latitude": 34.983257,
//                   "longitude": -119.90304
//                 },
//                 {
//                   "latitude": 34.983501,
//                   "longitude": -119.9008
//                 },
//                 {
//                   "latitude": 34.983608,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 34.983753,
//                   "longitude": -119.89532
//                 },
//                 {
//                   "latitude": 34.983967,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 34.98444,
//                   "longitude": -119.88941
//                 },
//                 {
//                   "latitude": 34.984581,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 34.984631,
//                   "longitude": -119.88398
//                 },
//                 {
//                   "latitude": 34.984715,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 34.985203,
//                   "longitude": -119.87818
//                 },
//                 {
//                   "latitude": 34.985237,
//                   "longitude": -119.87683
//                 },
//                 {
//                   "latitude": 34.985317,
//                   "longitude": -119.87283
//                 },
//                 {
//                   "latitude": 34.985329,
//                   "longitude": -119.87159
//                 },
//                 {
//                   "latitude": 34.986034,
//                   "longitude": -119.86688
//                 },
//                 {
//                   "latitude": 34.986038,
//                   "longitude": -119.86635
//                 },
//                 {
//                   "latitude": 34.986584,
//                   "longitude": -119.86143
//                 },
//                 {
//                   "latitude": 34.986603,
//                   "longitude": -119.86111
//                 },
//                 {
//                   "latitude": 34.986607,
//                   "longitude": -119.86108
//                 },
//                 {
//                   "latitude": 34.987133,
//                   "longitude": -119.85587
//                 },
//                 {
//                   "latitude": 34.987328,
//                   "longitude": -119.85514
//                 },
//                 {
//                   "latitude": 34.987812,
//                   "longitude": -119.85062
//                 },
//                 {
//                   "latitude": 34.988266,
//                   "longitude": -119.84898
//                 },
//                 {
//                   "latitude": 34.988762,
//                   "longitude": -119.84538
//                 },
//                 {
//                   "latitude": 34.989655,
//                   "longitude": -119.84238
//                 },
//                 {
//                   "latitude": 34.989986,
//                   "longitude": -119.84014
//                 },
//                 {
//                   "latitude": 34.991425,
//                   "longitude": -119.83542
//                 },
//                 {
//                   "latitude": 34.991508,
//                   "longitude": -119.8349
//                 },
//                 {
//                   "latitude": 34.991951,
//                   "longitude": -119.8334
//                 },
//                 {
//                   "latitude": 34.993607,
//                   "longitude": -119.82966
//                 },
//                 {
//                   "latitude": 34.994774,
//                   "longitude": -119.8269
//                 },
//                 {
//                   "latitude": 34.995647,
//                   "longitude": -119.82442
//                 },
//                 {
//                   "latitude": 34.997318,
//                   "longitude": -119.81929
//                 },
//                 {
//                   "latitude": 35.002567,
//                   "longitude": -119.81929
//                 },
//                 {
//                   "latitude": 35.002682,
//                   "longitude": -119.81929
//                 },
//                 {
//                   "latitude": 35.004009,
//                   "longitude": -119.82312
//                 },
//                 {
//                   "latitude": 35.004356,
//                   "longitude": -119.82442
//                 },
//                 {
//                   "latitude": 35.005527,
//                   "longitude": -119.82688
//                 },
//                 {
//                   "latitude": 35.006401,
//                   "longitude": -119.82966
//                 },
//                 {
//                   "latitude": 35.006992,
//                   "longitude": -119.83069
//                 },
//                 {
//                   "latitude": 35.008049,
//                   "longitude": -119.83338
//                 },
//                 {
//                   "latitude": 35.008446,
//                   "longitude": -119.83451
//                 },
//                 {
//                   "latitude": 35.008495,
//                   "longitude": -119.8349
//                 },
//                 {
//                   "latitude": 35.009785,
//                   "longitude": -119.83845
//                 },
//                 {
//                   "latitude": 35.010017,
//                   "longitude": -119.84014
//                 },
//                 {
//                   "latitude": 35.010902,
//                   "longitude": -119.8426
//                 },
//                 {
//                   "latitude": 35.011242,
//                   "longitude": -119.84538
//                 },
//                 {
//                   "latitude": 35.011768,
//                   "longitude": -119.84699
//                 },
//                 {
//                   "latitude": 35.012192,
//                   "longitude": -119.85062
//                 },
//                 {
//                   "latitude": 35.012482,
//                   "longitude": -119.85153
//                 },
//                 {
//                   "latitude": 35.012867,
//                   "longitude": -119.85587
//                 },
//                 {
//                   "latitude": 35.012974,
//                   "longitude": -119.8563
//                 },
//                 {
//                   "latitude": 35.013401,
//                   "longitude": -119.86111
//                 },
//                 {
//                   "latitude": 35.013405,
//                   "longitude": -119.86112
//                 },
//                 {
//                   "latitude": 35.013416,
//                   "longitude": -119.86141
//                 },
//                 {
//                   "latitude": 35.01395,
//                   "longitude": -119.86583
//                 },
//                 {
//                   "latitude": 35.013962,
//                   "longitude": -119.86635
//                 },
//                 {
//                   "latitude": 35.01466,
//                   "longitude": -119.87038
//                 },
//                 {
//                   "latitude": 35.014671,
//                   "longitude": -119.87159
//                 },
//                 {
//                   "latitude": 35.014751,
//                   "longitude": -119.87553
//                 },
//                 {
//                   "latitude": 35.014763,
//                   "longitude": -119.87683
//                 },
//                 {
//                   "latitude": 35.015244,
//                   "longitude": -119.88029
//                 },
//                 {
//                   "latitude": 35.015282,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 35.015327,
//                   "longitude": -119.88544
//                 },
//                 {
//                   "latitude": 35.015419,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 35.015884,
//                   "longitude": -119.89014
//                 },
//                 {
//                   "latitude": 35.016033,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 35.016182,
//                   "longitude": -119.8951
//                 },
//                 {
//                   "latitude": 35.016392,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 35.01664,
//                   "longitude": -119.89989
//                 },
//                 {
//                   "latitude": 35.016743,
//                   "longitude": -119.90304
//                 },
//                 {
//                   "latitude": 35.016739,
//                   "longitude": -119.90504
//                 },
//                 {
//                   "latitude": 35.016796,
//                   "longitude": -119.90763
//                 },
//                 {
//                   "latitude": 35.016521,
//                   "longitude": -119.90902
//                 },
//                 {
//                   "latitude": 35.016605,
//                   "longitude": -119.91041
//                 },
//                 {
//                   "latitude": 35.016579,
//                   "longitude": -119.9128
//                 },
//                 {
//                   "latitude": 35.01693,
//                   "longitude": -119.91412
//                 },
//                 {
//                   "latitude": 35.016933,
//                   "longitude": -119.91533
//                 },
//                 {
//                   "latitude": 35.016682,
//                   "longitude": -119.91745
//                 },
//                 {
//                   "latitude": 35.016533,
//                   "longitude": -119.91834
//                 },
//                 {
//                   "latitude": 35.016235,
//                   "longitude": -119.92007
//                 },
//                 {
//                   "latitude": 35.016228,
//                   "longitude": -119.92126
//                 },
//                 {
//                   "latitude": 35.016167,
//                   "longitude": -119.92269
//                 },
//                 {
//                   "latitude": 35.016277,
//                   "longitude": -119.92383
//                 },
//                 {
//                   "latitude": 35.016251,
//                   "longitude": -119.92532
//                 },
//                 {
//                   "latitude": 35.016041,
//                   "longitude": -119.92668
//                 },
//                 {
//                   "latitude": 35.0159,
//                   "longitude": -119.92793
//                 },
//                 {
//                   "latitude": 35.015408,
//                   "longitude": -119.92992
//                 },
//                 {
//                   "latitude": 35.015263,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 35.015106,
//                   "longitude": -119.93283
//                 },
//                 {
//                   "latitude": 35.015091,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 35.015141,
//                   "longitude": -119.93542
//                 },
//                 {
//                   "latitude": 35.015133,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 35.014839,
//                   "longitude": -119.93834
//                 },
//                 {
//                   "latitude": 35.014835,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 35.014759,
//                   "longitude": -119.93926
//                 },
//                 {
//                   "latitude": 35.014679,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 35.014671,
//                   "longitude": -119.94112
//                 },
//                 {
//                   "latitude": 35.014675,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 35.014671,
//                   "longitude": -119.94374
//                 },
//                 {
//                   "latitude": 35.014664,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 35.014652,
//                   "longitude": -119.94638
//                 },
//                 {
//                   "latitude": 35.014572,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 35.014568,
//                   "longitude": -119.94908
//                 },
//                 {
//                   "latitude": 35.014488,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 35.014465,
//                   "longitude": -119.9518
//                 },
//                 {
//                   "latitude": 35.014431,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 35.014427,
//                   "longitude": -119.95446
//                 },
//                 {
//                   "latitude": 35.014366,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 35.014336,
//                   "longitude": -119.95717
//                 },
//                 {
//                   "latitude": 35.014256,
//                   "longitude": -119.95938
//                 },
//                 {
//                   "latitude": 35.014248,
//                   "longitude": -119.95988
//                 },
//                 {
//                   "latitude": 35.014168,
//                   "longitude": -119.962
//                 },
//                 {
//                   "latitude": 35.014088,
//                   "longitude": -119.96265
//                 },
//                 {
//                   "latitude": 35.014011,
//                   "longitude": -119.96462
//                 },
//                 {
//                   "latitude": 35.013996,
//                   "longitude": -119.96536
//                 },
//                 {
//                   "latitude": 35.013885,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 35.01368,
//                   "longitude": -119.96829
//                 },
//                 {
//                   "latitude": 35.013577,
//                   "longitude": -119.96986
//                 },
//                 {
//                   "latitude": 35.013512,
//                   "longitude": -119.97108
//                 },
//                 {
//                   "latitude": 35.013405,
//                   "longitude": -119.97248
//                 },
//                 {
//                   "latitude": 35.013058,
//                   "longitude": -119.97414
//                 },
//                 {
//                   "latitude": 35.012974,
//                   "longitude": -119.97511
//                 },
//                 {
//                   "latitude": 35.012783,
//                   "longitude": -119.97703
//                 },
//                 {
//                   "latitude": 35.012722,
//                   "longitude": -119.97772
//                 },
//                 {
//                   "latitude": 35.012074,
//                   "longitude": -119.98013
//                 },
//                 {
//                   "latitude": 35.012051,
//                   "longitude": -119.98035
//                 },
//                 {
//                   "latitude": 35.012051,
//                   "longitude": -119.98037
//                 },
//                 {
//                   "latitude": 35.012074,
//                   "longitude": -119.98278
//                 },
//                 {
//                   "latitude": 35.012077,
//                   "longitude": -119.98296
//                 },
//                 {
//                   "latitude": 35.012077,
//                   "longitude": -119.98296
//                 },
//                 {
//                   "latitude": 35.012157,
//                   "longitude": -119.9855
//                 },
//                 {
//                   "latitude": 35.012161,
//                   "longitude": -119.98559
//                 },
//                 {
//                   "latitude": 35.012951,
//                   "longitude": -119.98735
//                 },
//                 {
//                   "latitude": 35.013084,
//                   "longitude": -119.9882
//                 },
//                 {
//                   "latitude": 35.013763,
//                   "longitude": -119.98918
//                 },
//                 {
//                   "latitude": 35.01392,
//                   "longitude": -119.99083
//                 },
//                 {
//                   "latitude": 35.014252,
//                   "longitude": -119.99133
//                 },
//                 {
//                   "latitude": 35.014553,
//                   "longitude": -119.99345
//                 },
//                 {
//                   "latitude": 35.014614,
//                   "longitude": -119.99359
//                 },
//                 {
//                   "latitude": 35.014759,
//                   "longitude": -119.99503
//                 },
//                 {
//                   "latitude": 35.015076,
//                   "longitude": -119.99576
//                 },
//                 {
//                   "latitude": 35.01511,
//                   "longitude": -119.99607
//                 },
//                 {
//                   "latitude": 35.015553,
//                   "longitude": -119.99791
//                 },
//                 {
//                   "latitude": 35.015587,
//                   "longitude": -119.99869
//                 },
//                 {
//                   "latitude": 35.015572,
//                   "longitude": -120.00052
//                 },
//                 {
//                   "latitude": 35.015572,
//                   "longitude": -120.00131
//                 },
//                 {
//                   "latitude": 35.015045,
//                   "longitude": -120.00365
//                 },
//                 {
//                   "latitude": 35.01503,
//                   "longitude": -120.00393
//                 },
//                 {
//                   "latitude": 35.014759,
//                   "longitude": -120.00467
//                 },
//                 {
//                   "latitude": 35.014484,
//                   "longitude": -120.00655
//                 },
//                 {
//                   "latitude": 35.014172,
//                   "longitude": -120.00713
//                 },
//                 {
//                   "latitude": 35.013638,
//                   "longitude": -120.00917
//                 },
//                 {
//                   "latitude": 35.012074,
//                   "longitude": -120.01147
//                 },
//                 {
//                   "latitude": 35.011898,
//                   "longitude": -120.0118
//                 },
//                 {
//                   "latitude": 35.010651,
//                   "longitude": -120.01318
//                 },
//                 {
//                   "latitude": 35.009758,
//                   "longitude": -120.01441
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -120.01478
//                 },
//                 {
//                   "latitude": 35.008183,
//                   "longitude": -120.01559
//                 },
//                 {
//                   "latitude": 35.00671,
//                   "longitude": -120.01684
//                 },
//                 {
//                   "latitude": 35.006199,
//                   "longitude": -120.01704
//                 },
//                 {
//                   "latitude": 35.004025,
//                   "longitude": -120.01826
//                 },
//                 {
//                   "latitude": 35.002571,
//                   "longitude": -120.01846
//                 },
//                 {
//                   "latitude": 35.001343,
//                   "longitude": -120.01886
//                 },
//                 {
//                   "latitude": 34.999474,
//                   "longitude": -120.01886
//                 },
//                 {
//                   "latitude": 34.998657,
//                   "longitude": -120.01886
//                 },
//                 {
//                   "latitude": 34.996964,
//                   "longitude": -120.01869
//                 },
//                 {
//                   "latitude": 34.995975,
//                   "longitude": -120.01826
//                 },
//                 {
//                   "latitude": 34.994865,
//                   "longitude": -120.01812
//                 },
//                 {
//                   "latitude": 34.993801,
//                   "longitude": -120.01704
//                 },
//                 {
//                   "latitude": 34.993393,
//                   "longitude": -120.01694
//                 },
//                 {
//                   "latitude": 34.99329,
//                   "longitude": -120.01684
//                 },
//                 {
//                   "latitude": 34.991394,
//                   "longitude": -120.01627
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -120.01478
//                 },
//                 {
//                   "latitude": 34.990345,
//                   "longitude": -120.01467
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             },
//             {
//               "id": 3,
//               "label": "50.0 % (P) - 50% - Expected Population: 3<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "50.0 % (P) - 50% - Expected Population: 3<br/>Source: JEM<br/>Event: Event1",
//               "lat": 34.997318,
//               "lon": -119.87769,
//               "alternateId": "3|3",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   true
//                 ],
//                 [
//                   "COLOR",
//                   "0000ff"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 34.989727,
//                   "longitude": -120.00742
//                 },
//                 {
//                   "latitude": 34.989639,
//                   "longitude": -120.00711
//                 },
//                 {
//                   "latitude": 34.989216,
//                   "longitude": -120.00613
//                 },
//                 {
//                   "latitude": 34.988987,
//                   "longitude": -120.00552
//                 },
//                 {
//                   "latitude": 34.988686,
//                   "longitude": -120.00418
//                 },
//                 {
//                   "latitude": 34.988583,
//                   "longitude": -120.00372
//                 },
//                 {
//                   "latitude": 34.988525,
//                   "longitude": -120.00335
//                 },
//                 {
//                   "latitude": 34.988277,
//                   "longitude": -120.00143
//                 },
//                 {
//                   "latitude": 34.988262,
//                   "longitude": -120.00121
//                 },
//                 {
//                   "latitude": 34.988262,
//                   "longitude": -120.00098
//                 },
//                 {
//                   "latitude": 34.988255,
//                   "longitude": -119.99879
//                 },
//                 {
//                   "latitude": 34.98827,
//                   "longitude": -119.99857
//                 },
//                 {
//                   "latitude": 34.988304,
//                   "longitude": -119.99832
//                 },
//                 {
//                   "latitude": 34.988544,
//                   "longitude": -119.99627
//                 },
//                 {
//                   "latitude": 34.988628,
//                   "longitude": -119.99584
//                 },
//                 {
//                   "latitude": 34.988804,
//                   "longitude": -119.99521
//                 },
//                 {
//                   "latitude": 34.989101,
//                   "longitude": -119.99383
//                 },
//                 {
//                   "latitude": 34.989391,
//                   "longitude": -119.99297
//                 },
//                 {
//                   "latitude": 34.989937,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 34.989937,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 34.989937,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -119.99017
//                 },
//                 {
//                   "latitude": 34.991234,
//                   "longitude": -119.98891
//                 },
//                 {
//                   "latitude": 34.991253,
//                   "longitude": -119.98886
//                 },
//                 {
//                   "latitude": 34.99128,
//                   "longitude": -119.98882
//                 },
//                 {
//                   "latitude": 34.99226,
//                   "longitude": -119.98755
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -119.98676
//                 },
//                 {
//                   "latitude": 34.992802,
//                   "longitude": -119.98624
//                 },
//                 {
//                   "latitude": 34.992825,
//                   "longitude": -119.98605
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -119.98503
//                 },
//                 {
//                   "latitude": 34.992603,
//                   "longitude": -119.98495
//                 },
//                 {
//                   "latitude": 34.992603,
//                   "longitude": -119.98493
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -119.9847
//                 },
//                 {
//                   "latitude": 34.992699,
//                   "longitude": -119.98362
//                 },
//                 {
//                   "latitude": 34.992706,
//                   "longitude": -119.98354
//                 },
//                 {
//                   "latitude": 34.992775,
//                   "longitude": -119.98231
//                 },
//                 {
//                   "latitude": 34.992767,
//                   "longitude": -119.98189
//                 },
//                 {
//                   "latitude": 34.992718,
//                   "longitude": -119.9809
//                 },
//                 {
//                   "latitude": 34.992676,
//                   "longitude": -119.98035
//                 },
//                 {
//                   "latitude": 34.992455,
//                   "longitude": -119.97854
//                 },
//                 {
//                   "latitude": 34.99239,
//                   "longitude": -119.97772
//                 },
//                 {
//                   "latitude": 34.992371,
//                   "longitude": -119.97601
//                 },
//                 {
//                   "latitude": 34.992271,
//                   "longitude": -119.97511
//                 },
//                 {
//                   "latitude": 34.992161,
//                   "longitude": -119.97359
//                 },
//                 {
//                   "latitude": 34.992104,
//                   "longitude": -119.97248
//                 },
//                 {
//                   "latitude": 34.992153,
//                   "longitude": -119.97098
//                 },
//                 {
//                   "latitude": 34.992081,
//                   "longitude": -119.96986
//                 },
//                 {
//                   "latitude": 34.99202,
//                   "longitude": -119.96848
//                 },
//                 {
//                   "latitude": 34.991997,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 34.992043,
//                   "longitude": -119.96584
//                 },
//                 {
//                   "latitude": 34.991993,
//                   "longitude": -119.96462
//                 },
//                 {
//                   "latitude": 34.99194,
//                   "longitude": -119.96332
//                 },
//                 {
//                   "latitude": 34.991905,
//                   "longitude": -119.962
//                 },
//                 {
//                   "latitude": 34.991932,
//                   "longitude": -119.96071
//                 },
//                 {
//                   "latitude": 34.99189,
//                   "longitude": -119.95938
//                 },
//                 {
//                   "latitude": 34.991867,
//                   "longitude": -119.95815
//                 },
//                 {
//                   "latitude": 34.991863,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 34.991859,
//                   "longitude": -119.95554
//                 },
//                 {
//                   "latitude": 34.991817,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 34.991787,
//                   "longitude": -119.95299
//                 },
//                 {
//                   "latitude": 34.991718,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 34.991676,
//                   "longitude": -119.95047
//                 },
//                 {
//                   "latitude": 34.991596,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 34.991535,
//                   "longitude": -119.94799
//                 },
//                 {
//                   "latitude": 34.991432,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 34.991394,
//                   "longitude": -119.9455
//                 },
//                 {
//                   "latitude": 34.99128,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 34.991226,
//                   "longitude": -119.94305
//                 },
//                 {
//                   "latitude": 34.991055,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 34.991035,
//                   "longitude": -119.94061
//                 },
//                 {
//                   "latitude": 34.990849,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 34.990837,
//                   "longitude": -119.93819
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -119.9358
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 34.990604,
//                   "longitude": -119.93318
//                 },
//                 {
//                   "latitude": 34.990604,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 34.990608,
//                   "longitude": -119.93276
//                 },
//                 {
//                   "latitude": 34.990639,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 34.990646,
//                   "longitude": -119.93051
//                 },
//                 {
//                   "latitude": 34.990704,
//                   "longitude": -119.92793
//                 },
//                 {
//                   "latitude": 34.990723,
//                   "longitude": -119.92783
//                 },
//                 {
//                   "latitude": 34.990803,
//                   "longitude": -119.92532
//                 },
//                 {
//                   "latitude": 34.99078,
//                   "longitude": -119.92515
//                 },
//                 {
//                   "latitude": 34.991089,
//                   "longitude": -119.92269
//                 },
//                 {
//                   "latitude": 34.991169,
//                   "longitude": -119.92214
//                 },
//                 {
//                   "latitude": 34.991383,
//                   "longitude": -119.92007
//                 },
//                 {
//                   "latitude": 34.991867,
//                   "longitude": -119.91884
//                 },
//                 {
//                   "latitude": 34.992016,
//                   "longitude": -119.91745
//                 },
//                 {
//                   "latitude": 34.992577,
//                   "longitude": -119.91553
//                 },
//                 {
//                   "latitude": 34.992706,
//                   "longitude": -119.91483
//                 },
//                 {
//                   "latitude": 34.992298,
//                   "longitude": -119.91318
//                 },
//                 {
//                   "latitude": 34.992428,
//                   "longitude": -119.91221
//                 },
//                 {
//                   "latitude": 34.992645,
//                   "longitude": -119.91022
//                 },
//                 {
//                   "latitude": 34.992687,
//                   "longitude": -119.90959
//                 },
//                 {
//                   "latitude": 34.99329,
//                   "longitude": -119.90818
//                 },
//                 {
//                   "latitude": 34.994045,
//                   "longitude": -119.90697
//                 },
//                 {
//                   "latitude": 34.994186,
//                   "longitude": -119.90609
//                 },
//                 {
//                   "latitude": 34.99448,
//                   "longitude": -119.90435
//                 },
//                 {
//                   "latitude": 34.993958,
//                   "longitude": -119.9037
//                 },
//                 {
//                   "latitude": 34.993351,
//                   "longitude": -119.90173
//                 },
//                 {
//                   "latitude": 34.99342,
//                   "longitude": -119.9016
//                 },
//                 {
//                   "latitude": 34.994499,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 34.994823,
//                   "longitude": -119.89499
//                 },
//                 {
//                   "latitude": 34.995052,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 34.995537,
//                   "longitude": -119.88905
//                 },
//                 {
//                   "latitude": 34.995682,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 34.996353,
//                   "longitude": -119.88302
//                 },
//                 {
//                   "latitude": 34.99649,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 34.997318,
//                   "longitude": -119.87769
//                 },
//                 {
//                   "latitude": 35.001801,
//                   "longitude": -119.87769
//                 },
//                 {
//                   "latitude": 35.002682,
//                   "longitude": -119.87769
//                 },
//                 {
//                   "latitude": 35.003426,
//                   "longitude": -119.88135
//                 },
//                 {
//                   "latitude": 35.00351,
//                   "longitude": -119.88207
//                 },
//                 {
//                   "latitude": 35.004112,
//                   "longitude": -119.88592
//                 },
//                 {
//                   "latitude": 35.004314,
//                   "longitude": -119.88731
//                 },
//                 {
//                   "latitude": 35.004787,
//                   "longitude": -119.8905
//                 },
//                 {
//                   "latitude": 35.004948,
//                   "longitude": -119.89256
//                 },
//                 {
//                   "latitude": 35.005268,
//                   "longitude": -119.89527
//                 },
//                 {
//                   "latitude": 35.005501,
//                   "longitude": -119.8978
//                 },
//                 {
//                   "latitude": 35.006077,
//                   "longitude": -119.89972
//                 },
//                 {
//                   "latitude": 35.007099,
//                   "longitude": -119.90058
//                 },
//                 {
//                   "latitude": 35.00724,
//                   "longitude": -119.90173
//                 },
//                 {
//                   "latitude": 35.00671,
//                   "longitude": -119.90287
//                 },
//                 {
//                   "latitude": 35.00552,
//                   "longitude": -119.90435
//                 },
//                 {
//                   "latitude": 35.00568,
//                   "longitude": -119.90536
//                 },
//                 {
//                   "latitude": 35.005955,
//                   "longitude": -119.90697
//                 },
//                 {
//                   "latitude": 35.006241,
//                   "longitude": -119.90742
//                 },
//                 {
//                   "latitude": 35.00671,
//                   "longitude": -119.90818
//                 },
//                 {
//                   "latitude": 35.007275,
//                   "longitude": -119.90904
//                 },
//                 {
//                   "latitude": 35.007313,
//                   "longitude": -119.90959
//                 },
//                 {
//                   "latitude": 35.007519,
//                   "longitude": -119.91142
//                 },
//                 {
//                   "latitude": 35.007572,
//                   "longitude": -119.91221
//                 },
//                 {
//                   "latitude": 35.007202,
//                   "longitude": -119.91435
//                 },
//                 {
//                   "latitude": 35.007294,
//                   "longitude": -119.91483
//                 },
//                 {
//                   "latitude": 35.007812,
//                   "longitude": -119.91637
//                 },
//                 {
//                   "latitude": 35.007988,
//                   "longitude": -119.91745
//                 },
//                 {
//                   "latitude": 35.008492,
//                   "longitude": -119.91833
//                 },
//                 {
//                   "latitude": 35.008617,
//                   "longitude": -119.92007
//                 },
//                 {
//                   "latitude": 35.00872,
//                   "longitude": -119.92073
//                 },
//                 {
//                   "latitude": 35.008911,
//                   "longitude": -119.92269
//                 },
//                 {
//                   "latitude": 35.008862,
//                   "longitude": -119.92321
//                 },
//                 {
//                   "latitude": 35.009197,
//                   "longitude": -119.92532
//                 },
//                 {
//                   "latitude": 35.009228,
//                   "longitude": -119.92548
//                 },
//                 {
//                   "latitude": 35.009296,
//                   "longitude": -119.92793
//                 },
//                 {
//                   "latitude": 35.009315,
//                   "longitude": -119.92801
//                 },
//                 {
//                   "latitude": 35.009361,
//                   "longitude": -119.93055
//                 },
//                 {
//                   "latitude": 35.009361,
//                   "longitude": -119.93058
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -119.93281
//                 },
//                 {
//                   "latitude": 35.009396,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 35.009396,
//                   "longitude": -119.93317
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -119.93539
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 35.009392,
//                   "longitude": -119.93579
//                 },
//                 {
//                   "latitude": 35.009151,
//                   "longitude": -119.93842
//                 },
//                 {
//                   "latitude": 35.00914,
//                   "longitude": -119.93866
//                 },
//                 {
//                   "latitude": 35.008945,
//                   "longitude": -119.94103
//                 },
//                 {
//                   "latitude": 35.008904,
//                   "longitude": -119.94151
//                 },
//                 {
//                   "latitude": 35.008717,
//                   "longitude": -119.94366
//                 },
//                 {
//                   "latitude": 35.008682,
//                   "longitude": -119.94435
//                 },
//                 {
//                   "latitude": 35.008564,
//                   "longitude": -119.94627
//                 },
//                 {
//                   "latitude": 35.008511,
//                   "longitude": -119.94714
//                 },
//                 {
//                   "latitude": 35.008404,
//                   "longitude": -119.9489
//                 },
//                 {
//                   "latitude": 35.008362,
//                   "longitude": -119.94991
//                 },
//                 {
//                   "latitude": 35.008278,
//                   "longitude": -119.95152
//                 },
//                 {
//                   "latitude": 35.008251,
//                   "longitude": -119.95264
//                 },
//                 {
//                   "latitude": 35.008183,
//                   "longitude": -119.95414
//                 },
//                 {
//                   "latitude": 35.008179,
//                   "longitude": -119.95532
//                 },
//                 {
//                   "latitude": 35.008137,
//                   "longitude": -119.95676
//                 },
//                 {
//                   "latitude": 35.00811,
//                   "longitude": -119.95801
//                 },
//                 {
//                   "latitude": 35.00811,
//                   "longitude": -119.95938
//                 },
//                 {
//                   "latitude": 35.008133,
//                   "longitude": -119.96061
//                 },
//                 {
//                   "latitude": 35.008091,
//                   "longitude": -119.962
//                 },
//                 {
//                   "latitude": 35.008041,
//                   "longitude": -119.96332
//                 },
//                 {
//                   "latitude": 35.008007,
//                   "longitude": -119.96462
//                 },
//                 {
//                   "latitude": 35.008053,
//                   "longitude": -119.96593
//                 },
//                 {
//                   "latitude": 35.008003,
//                   "longitude": -119.96724
//                 },
//                 {
//                   "latitude": 35.007942,
//                   "longitude": -119.96866
//                 },
//                 {
//                   "latitude": 35.007915,
//                   "longitude": -119.96986
//                 },
//                 {
//                   "latitude": 35.007965,
//                   "longitude": -119.97126
//                 },
//                 {
//                   "latitude": 35.007893,
//                   "longitude": -119.97248
//                 },
//                 {
//                   "latitude": 35.007782,
//                   "longitude": -119.97406
//                 },
//                 {
//                   "latitude": 35.007725,
//                   "longitude": -119.97511
//                 },
//                 {
//                   "latitude": 35.007706,
//                   "longitude": -119.97675
//                 },
//                 {
//                   "latitude": 35.00761,
//                   "longitude": -119.97772
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -119.97969
//                 },
//                 {
//                   "latitude": 35.007324,
//                   "longitude": -119.98035
//                 },
//                 {
//                   "latitude": 35.007095,
//                   "longitude": -119.98148
//                 },
//                 {
//                   "latitude": 35.00705,
//                   "longitude": -119.98231
//                 },
//                 {
//                   "latitude": 35.007061,
//                   "longitude": -119.98262
//                 },
//                 {
//                   "latitude": 35.007225,
//                   "longitude": -119.98362
//                 },
//                 {
//                   "latitude": 35.00721,
//                   "longitude": -119.98379
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -119.98482
//                 },
//                 {
//                   "latitude": 35.007393,
//                   "longitude": -119.98492
//                 },
//                 {
//                   "latitude": 35.007397,
//                   "longitude": -119.98493
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -119.98503
//                 },
//                 {
//                   "latitude": 35.007198,
//                   "longitude": -119.98624
//                 },
//                 {
//                   "latitude": 35.007244,
//                   "longitude": -119.98637
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -119.98676
//                 },
//                 {
//                   "latitude": 35.007664,
//                   "longitude": -119.98727
//                 },
//                 {
//                   "latitude": 35.00774,
//                   "longitude": -119.98755
//                 },
//                 {
//                   "latitude": 35.008198,
//                   "longitude": -119.98806
//                 },
//                 {
//                   "latitude": 35.00872,
//                   "longitude": -119.98882
//                 },
//                 {
//                   "latitude": 35.008739,
//                   "longitude": -119.98884
//                 },
//                 {
//                   "latitude": 35.008747,
//                   "longitude": -119.98886
//                 },
//                 {
//                   "latitude": 35.009186,
//                   "longitude": -119.98972
//                 },
//                 {
//                   "latitude": 35.00938,
//                   "longitude": -119.99017
//                 },
//                 {
//                   "latitude": 35.009613,
//                   "longitude": -119.99062
//                 },
//                 {
//                   "latitude": 35.009979,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 35.01001,
//                   "longitude": -119.99154
//                 },
//                 {
//                   "latitude": 35.010063,
//                   "longitude": -119.99164
//                 },
//                 {
//                   "latitude": 35.010452,
//                   "longitude": -119.99241
//                 },
//                 {
//                   "latitude": 35.01059,
//                   "longitude": -119.99297
//                 },
//                 {
//                   "latitude": 35.010899,
//                   "longitude": -119.99383
//                 },
//                 {
//                   "latitude": 35.011074,
//                   "longitude": -119.99442
//                 },
//                 {
//                   "latitude": 35.011364,
//                   "longitude": -119.99584
//                 },
//                 {
//                   "latitude": 35.011456,
//                   "longitude": -119.99627
//                 },
//                 {
//                   "latitude": 35.011505,
//                   "longitude": -119.99663
//                 },
//                 {
//                   "latitude": 35.01173,
//                   "longitude": -119.99857
//                 },
//                 {
//                   "latitude": 35.011745,
//                   "longitude": -119.99879
//                 },
//                 {
//                   "latitude": 35.011742,
//                   "longitude": -119.99901
//                 },
//                 {
//                   "latitude": 35.011738,
//                   "longitude": -120.00121
//                 },
//                 {
//                   "latitude": 35.011723,
//                   "longitude": -120.00143
//                 },
//                 {
//                   "latitude": 35.011681,
//                   "longitude": -120.00169
//                 },
//                 {
//                   "latitude": 35.011417,
//                   "longitude": -120.00372
//                 },
//                 {
//                   "latitude": 35.011314,
//                   "longitude": -120.00418
//                 },
//                 {
//                   "latitude": 35.011082,
//                   "longitude": -120.0049
//                 },
//                 {
//                   "latitude": 35.010784,
//                   "longitude": -120.00613
//                 },
//                 {
//                   "latitude": 35.010361,
//                   "longitude": -120.00711
//                 },
//                 {
//                   "latitude": 35.010063,
//                   "longitude": -120.00771
//                 },
//                 {
//                   "latitude": 35.009598,
//                   "longitude": -120.00851
//                 },
//                 {
//                   "latitude": 35.00872,
//                   "longitude": -120.00978
//                 },
//                 {
//                   "latitude": 35.008686,
//                   "longitude": -120.00983
//                 },
//                 {
//                   "latitude": 35.008476,
//                   "longitude": -120.01006
//                 },
//                 {
//                   "latitude": 35.007519,
//                   "longitude": -120.01118
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -120.01132
//                 },
//                 {
//                   "latitude": 35.006271,
//                   "longitude": -120.01222
//                 },
//                 {
//                   "latitude": 35.006039,
//                   "longitude": -120.01242
//                 },
//                 {
//                   "latitude": 35.005989,
//                   "longitude": -120.01245
//                 },
//                 {
//                   "latitude": 35.004375,
//                   "longitude": -120.01338
//                 },
//                 {
//                   "latitude": 35.003765,
//                   "longitude": -120.01365
//                 },
//                 {
//                   "latitude": 35.001549,
//                   "longitude": -120.01421
//                 },
//                 {
//                   "latitude": 35.001396,
//                   "longitude": -120.01425
//                 },
//                 {
//                   "latitude": 35.001293,
//                   "longitude": -120.01427
//                 },
//                 {
//                   "latitude": 34.998806,
//                   "longitude": -120.01427
//                 },
//                 {
//                   "latitude": 34.998707,
//                   "longitude": -120.01427
//                 },
//                 {
//                   "latitude": 34.998604,
//                   "longitude": -120.01425
//                 },
//                 {
//                   "latitude": 34.996632,
//                   "longitude": -120.01377
//                 },
//                 {
//                   "latitude": 34.996235,
//                   "longitude": -120.01365
//                 },
//                 {
//                   "latitude": 34.995625,
//                   "longitude": -120.01338
//                 },
//                 {
//                   "latitude": 34.994728,
//                   "longitude": -120.01301
//                 },
//                 {
//                   "latitude": 34.994011,
//                   "longitude": -120.01245
//                 },
//                 {
//                   "latitude": 34.99398,
//                   "longitude": -120.01243
//                 },
//                 {
//                   "latitude": 34.993961,
//                   "longitude": -120.01242
//                 },
//                 {
//                   "latitude": 34.993206,
//                   "longitude": -120.01188
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -120.01132
//                 },
//                 {
//                   "latitude": 34.992481,
//                   "longitude": -120.01118
//                 },
//                 {
//                   "latitude": 34.991837,
//                   "longitude": -120.0106
//                 },
//                 {
//                   "latitude": 34.991314,
//                   "longitude": -120.00983
//                 },
//                 {
//                   "latitude": 34.991299,
//                   "longitude": -120.0098
//                 },
//                 {
//                   "latitude": 34.99128,
//                   "longitude": -120.00978
//                 },
//                 {
//                   "latitude": 34.990711,
//                   "longitude": -120.00907
//                 },
//                 {
//                   "latitude": 34.990402,
//                   "longitude": -120.00851
//                 },
//                 {
//                   "latitude": 34.990227,
//                   "longitude": -120.00823
//                 },
//                 {
//                   "latitude": 34.989937,
//                   "longitude": -120.00771
//                 },
//                 {
//                   "latitude": 34.989727,
//                   "longitude": -120.00742
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             },
//             {
//               "id": 4,
//               "label": "90.0 % (P) - 90% - Expected Population: 0<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "90.0 % (P) - 90% - Expected Population: 0<br/>Source: JEM<br/>Event: Event1",
//               "lat": 34.999329,
//               "lon": -119.98778,
//               "alternateId": "4|4",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   true
//                 ],
//                 [
//                   "COLOR",
//                   "ffff00"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 34.996395,
//                   "longitude": -120.01007
//                 },
//                 {
//                   "latitude": 34.995739,
//                   "longitude": -120.00983
//                 },
//                 {
//                   "latitude": 34.995537,
//                   "longitude": -120.0096
//                 },
//                 {
//                   "latitude": 34.995304,
//                   "longitude": -120.00953
//                 },
//                 {
//                   "latitude": 34.994869,
//                   "longitude": -120.00893
//                 },
//                 {
//                   "latitude": 34.994202,
//                   "longitude": -120.00851
//                 },
//                 {
//                   "latitude": 34.994122,
//                   "longitude": -120.00836
//                 },
//                 {
//                   "latitude": 34.993961,
//                   "longitude": -120.00827
//                 },
//                 {
//                   "latitude": 34.993572,
//                   "longitude": -120.00759
//                 },
//                 {
//                   "latitude": 34.993103,
//                   "longitude": -120.00721
//                 },
//                 {
//                   "latitude": 34.992992,
//                   "longitude": -120.00684
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -120.00656
//                 },
//                 {
//                   "latitude": 34.992439,
//                   "longitude": -120.00607
//                 },
//                 {
//                   "latitude": 34.992313,
//                   "longitude": -120.0059
//                 },
//                 {
//                   "latitude": 34.992088,
//                   "longitude": -120.0051
//                 },
//                 {
//                   "latitude": 34.991772,
//                   "longitude": -120.00459
//                 },
//                 {
//                   "latitude": 34.991707,
//                   "longitude": -120.00417
//                 },
//                 {
//                   "latitude": 34.99128,
//                   "longitude": -120.00333
//                 },
//                 {
//                   "latitude": 34.991268,
//                   "longitude": -120.00328
//                 },
//                 {
//                   "latitude": 34.991264,
//                   "longitude": -120.00327
//                 },
//                 {
//                   "latitude": 34.991108,
//                   "longitude": -120.00214
//                 },
//                 {
//                   "latitude": 34.991062,
//                   "longitude": -120.00197
//                 },
//                 {
//                   "latitude": 34.990986,
//                   "longitude": -120.00095
//                 },
//                 {
//                   "latitude": 34.990952,
//                   "longitude": -120.00066
//                 },
//                 {
//                   "latitude": 34.990952,
//                   "longitude": -119.99966
//                 },
//                 {
//                   "latitude": 34.990948,
//                   "longitude": -119.99934
//                 },
//                 {
//                   "latitude": 34.991024,
//                   "longitude": -119.99828
//                 },
//                 {
//                   "latitude": 34.991051,
//                   "longitude": -119.99803
//                 },
//                 {
//                   "latitude": 34.991241,
//                   "longitude": -119.99677
//                 },
//                 {
//                   "latitude": 34.991249,
//                   "longitude": -119.99673
//                 },
//                 {
//                   "latitude": 34.99128,
//                   "longitude": -119.9966
//                 },
//                 {
//                   "latitude": 34.991711,
//                   "longitude": -119.99541
//                 },
//                 {
//                   "latitude": 34.991909,
//                   "longitude": -119.9948
//                 },
//                 {
//                   "latitude": 34.992237,
//                   "longitude": -119.9941
//                 },
//                 {
//                   "latitude": 34.992622,
//                   "longitude": -119.99319
//                 },
//                 {
//                   "latitude": 34.992912,
//                   "longitude": -119.99279
//                 },
//                 {
//                   "latitude": 34.993614,
//                   "longitude": -119.99182
//                 },
//                 {
//                   "latitude": 34.993889,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 34.993961,
//                   "longitude": -119.99138
//                 },
//                 {
//                   "latitude": 34.995026,
//                   "longitude": -119.99017
//                 },
//                 {
//                   "latitude": 34.995304,
//                   "longitude": -119.98985
//                 },
//                 {
//                   "latitude": 34.996216,
//                   "longitude": -119.98928
//                 },
//                 {
//                   "latitude": 34.996647,
//                   "longitude": -119.98902
//                 },
//                 {
//                   "latitude": 34.996925,
//                   "longitude": -119.98886
//                 },
//                 {
//                   "latitude": 34.997986,
//                   "longitude": -119.9881
//                 },
//                 {
//                   "latitude": 34.998985,
//                   "longitude": -119.98788
//                 },
//                 {
//                   "latitude": 34.999329,
//                   "longitude": -119.98778
//                 },
//                 {
//                   "latitude": 35.000435,
//                   "longitude": -119.98778
//                 },
//                 {
//                   "latitude": 35.000671,
//                   "longitude": -119.98778
//                 },
//                 {
//                   "latitude": 35.001602,
//                   "longitude": -119.98795
//                 },
//                 {
//                   "latitude": 35.002014,
//                   "longitude": -119.9881
//                 },
//                 {
//                   "latitude": 35.002529,
//                   "longitude": -119.98836
//                 },
//                 {
//                   "latitude": 35.003075,
//                   "longitude": -119.98886
//                 },
//                 {
//                   "latitude": 35.003227,
//                   "longitude": -119.98898
//                 },
//                 {
//                   "latitude": 35.003353,
//                   "longitude": -119.98902
//                 },
//                 {
//                   "latitude": 35.004047,
//                   "longitude": -119.98949
//                 },
//                 {
//                   "latitude": 35.004696,
//                   "longitude": -119.98985
//                 },
//                 {
//                   "latitude": 35.004833,
//                   "longitude": -119.99004
//                 },
//                 {
//                   "latitude": 35.004974,
//                   "longitude": -119.99017
//                 },
//                 {
//                   "latitude": 35.005371,
//                   "longitude": -119.99082
//                 },
//                 {
//                   "latitude": 35.006039,
//                   "longitude": -119.99138
//                 },
//                 {
//                   "latitude": 35.006077,
//                   "longitude": -119.99145
//                 },
//                 {
//                   "latitude": 35.006111,
//                   "longitude": -119.99149
//                 },
//                 {
//                   "latitude": 35.006538,
//                   "longitude": -119.9923
//                 },
//                 {
//                   "latitude": 35.007088,
//                   "longitude": -119.99279
//                 },
//                 {
//                   "latitude": 35.007149,
//                   "longitude": -119.99301
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -119.99319
//                 },
//                 {
//                   "latitude": 35.007618,
//                   "longitude": -119.99387
//                 },
//                 {
//                   "latitude": 35.007763,
//                   "longitude": -119.9941
//                 },
//                 {
//                   "latitude": 35.00795,
//                   "longitude": -119.99486
//                 },
//                 {
//                   "latitude": 35.008289,
//                   "longitude": -119.99541
//                 },
//                 {
//                   "latitude": 35.008347,
//                   "longitude": -119.99578
//                 },
//                 {
//                   "latitude": 35.00872,
//                   "longitude": -119.9966
//                 },
//                 {
//                   "latitude": 35.008743,
//                   "longitude": -119.9967
//                 },
//                 {
//                   "latitude": 35.008751,
//                   "longitude": -119.99673
//                 },
//                 {
//                   "latitude": 35.008907,
//                   "longitude": -119.99785
//                 },
//                 {
//                   "latitude": 35.008949,
//                   "longitude": -119.99803
//                 },
//                 {
//                   "latitude": 35.009018,
//                   "longitude": -119.99905
//                 },
//                 {
//                   "latitude": 35.009052,
//                   "longitude": -119.99934
//                 },
//                 {
//                   "latitude": 35.009052,
//                   "longitude": -120.00034
//                 },
//                 {
//                   "latitude": 35.009048,
//                   "longitude": -120.00066
//                 },
//                 {
//                   "latitude": 35.008961,
//                   "longitude": -120.00173
//                 },
//                 {
//                   "latitude": 35.008938,
//                   "longitude": -120.00197
//                 },
//                 {
//                   "latitude": 35.008739,
//                   "longitude": -120.00326
//                 },
//                 {
//                   "latitude": 35.008736,
//                   "longitude": -120.00327
//                 },
//                 {
//                   "latitude": 35.00872,
//                   "longitude": -120.00333
//                 },
//                 {
//                   "latitude": 35.008228,
//                   "longitude": -120.00459
//                 },
//                 {
//                   "latitude": 35.007965,
//                   "longitude": -120.00533
//                 },
//                 {
//                   "latitude": 35.007687,
//                   "longitude": -120.0059
//                 },
//                 {
//                   "latitude": 35.007378,
//                   "longitude": -120.00656
//                 },
//                 {
//                   "latitude": 35.006897,
//                   "longitude": -120.00721
//                 },
//                 {
//                   "latitude": 35.006039,
//                   "longitude": -120.00827
//                 },
//                 {
//                   "latitude": 35.005798,
//                   "longitude": -120.00851
//                 },
//                 {
//                   "latitude": 35.004696,
//                   "longitude": -120.00953
//                 },
//                 {
//                   "latitude": 35.004261,
//                   "longitude": -120.00983
//                 },
//                 {
//                   "latitude": 35.003353,
//                   "longitude": -120.01025
//                 },
//                 {
//                   "latitude": 35.002598,
//                   "longitude": -120.01057
//                 },
//                 {
//                   "latitude": 35.002014,
//                   "longitude": -120.01074
//                 },
//                 {
//                   "latitude": 35.000816,
//                   "longitude": -120.01099
//                 },
//                 {
//                   "latitude": 35.000671,
//                   "longitude": -120.01102
//                 },
//                 {
//                   "latitude": 34.999458,
//                   "longitude": -120.01102
//                 },
//                 {
//                   "latitude": 34.999329,
//                   "longitude": -120.01102
//                 },
//                 {
//                   "latitude": 34.998352,
//                   "longitude": -120.01078
//                 },
//                 {
//                   "latitude": 34.997986,
//                   "longitude": -120.01074
//                 },
//                 {
//                   "latitude": 34.997379,
//                   "longitude": -120.01042
//                 },
//                 {
//                   "latitude": 34.996647,
//                   "longitude": -120.01025
//                 },
//                 {
//                   "latitude": 34.996395,
//                   "longitude": -120.01007
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             },
//             {
//               "id": 5,
//               "label": "  - %ATP45_0<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "  - %ATP45_0<br/>Source: JEM<br/>Event: Event1",
//               "lat": 35.00369,
//               "lon": -119.84677,
//               "alternateId": "5|5",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   false
//                 ],
//                 [
//                   "COLOR",
//                   "ff00ff"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 35.02667,
//                   "longitude": -120.00534
//                 },
//                 {
//                   "latitude": 35.02555,
//                   "longitude": -120.01072
//                 },
//                 {
//                   "latitude": 35.0237,
//                   "longitude": -120.01579
//                 },
//                 {
//                   "latitude": 35.02117,
//                   "longitude": -120.02042
//                 },
//                 {
//                   "latitude": 35.01804,
//                   "longitude": -120.02446
//                 },
//                 {
//                   "latitude": 35.0144,
//                   "longitude": -120.0278
//                 },
//                 {
//                   "latitude": 35.01034,
//                   "longitude": -120.03035
//                 },
//                 {
//                   "latitude": 35.00599,
//                   "longitude": -120.03203
//                 },
//                 {
//                   "latitude": 35.00147,
//                   "longitude": -120.0328
//                 },
//                 {
//                   "latitude": 34.9969,
//                   "longitude": -120.03263
//                 },
//                 {
//                   "latitude": 34.99243,
//                   "longitude": -120.03153
//                 },
//                 {
//                   "latitude": 34.98817,
//                   "longitude": -120.02953
//                 },
//                 {
//                   "latitude": 34.98425,
//                   "longitude": -120.02669
//                 },
//                 {
//                   "latitude": 34.98078,
//                   "longitude": -120.02309
//                 },
//                 {
//                   "latitude": 34.97785,
//                   "longitude": -120.01882
//                 },
//                 {
//                   "latitude": 34.97556,
//                   "longitude": -120.01403
//                 },
//                 {
//                   "latitude": 34.97397,
//                   "longitude": -120.00883
//                 },
//                 {
//                   "latitude": 34.97312,
//                   "longitude": -120.00338
//                 },
//                 {
//                   "latitude": 34.96035,
//                   "longitude": -119.85452
//                 },
//                 {
//                   "latitude": 34.98174,
//                   "longitude": -119.84834
//                 },
//                 {
//                   "latitude": 35.00369,
//                   "longitude": -119.84677
//                 },
//                 {
//                   "latitude": 35.02553,
//                   "longitude": -119.84986
//                 },
//                 {
//                   "latitude": 35.0466,
//                   "longitude": -119.85752
//                 },
//                 {
//                   "latitude": 35.02667,
//                   "longitude": -120.00534
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             },
//             {
//               "id": 6,
//               "label": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
//               "detailLabel": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
//               "lat": 35.00719,
//               "lon": -119.69352,
//               "alternateId": "6|6",
//               "hasDetails": false,
//               "GeometryTag": true,
//               "attributes": [
//                 [
//                   "FILL",
//                   false
//                 ],
//                 [
//                   "COLOR",
//                   "ffffff"
//                 ]
//               ],
//               "polygonPoints": [
//                 {
//                   "latitude": 34.96035,
//                   "longitude": -119.85452
//                 },
//                 {
//                   "latitude": 34.92052,
//                   "longitude": -119.70917
//                 },
//                 {
//                   "latitude": 34.96329,
//                   "longitude": -119.69674
//                 },
//                 {
//                   "latitude": 35.00719,
//                   "longitude": -119.69352
//                 },
//                 {
//                   "latitude": 35.05088,
//                   "longitude": -119.69962
//                 },
//                 {
//                   "latitude": 35.09304,
//                   "longitude": -119.71486
//                 },
//                 {
//                   "latitude": 35.0466,
//                   "longitude": -119.85752
//                 },
//                 {
//                   "latitude": 35.02553,
//                   "longitude": -119.84986
//                 },
//                 {
//                   "latitude": 35.00369,
//                   "longitude": -119.84677
//                 },
//                 {
//                   "latitude": 34.98174,
//                   "longitude": -119.84834
//                 },
//                 {
//                   "latitude": 34.96035,
//                   "longitude": -119.85452
//                 }
//               ],
//               "circleLocation": {},
//               "circleRadius": 0.0
//             }
//           ]
//         ]
//       ],
//       "polygonPoints": [
//       ],
//       "circleLocation": {},
//       "circleRadius": 0.0
//     }
//   ],
//       "tracks": [
//   ]
// }};


testData.PlumeData = {
  "Results": {
    "callouts": [
      {
        "id": 1,
        "label": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
        "detailLabel": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
        "lat": 35.0,
        "lon": -120.0,
        "levelTwoBody": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>-----<br/>Location: 0S 0W  Altitude: 0 m AGL<br/>-----<br/>Date/Time: Fri Mar 19 16:11:21 GMT 2010<br/>-----<br/>Nuclear Weapon Detonation: Incident 1<br/>-----<br/><br/>Source: JEM",
        "alternateId": "1|1",
        "hasLevelTwo": true,
        "hasDetails": false,
        "GeometryTag": true,
        "attributes": [
          [
            "HEADER",
            true
          ],
          [
            "PLUMES",
            [
              {
                "id": 1,
                "label": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
                "detailLabel": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
                "lat": 34.997318,
                "lon": -119.81619,
                "alternateId": "1|1",
                "hasDetails": false,
                "GeometryTag": true,
                "attributes": [
                  [
                    "FILL",
                    false
                  ],
                  [
                    "COLOR",
                    "ff0000"
                  ]
                ],
                "polygonPoints": [
                  {
                    "latitude": 34.978542,
                    "longitude": -119.99999
                  },
                  {
                    "latitude": 34.978542,
                    "longitude": -119.99869
                  },
                  {
                    "latitude": 34.978069,
                    "longitude": -119.99783
                  },
                  {
                    "latitude": 34.978069,
                    "longitude": -119.99607
                  },
                  {
                    "latitude": 34.980556,
                    "longitude": -120.00065
                  },
                  {
                    "latitude": 34.979874,
                    "longitude": -120.00002
                  },
                  {
                    "latitude": 34.978542,
                    "longitude": -119.99999
                  }
                ],
                "circleLocation": {},
                "circleRadius": 0.0
              },
              {
                "id": 2,
                "label": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
                "detailLabel": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
                "lat": 35.00719,
                "lon": -119.69352,
                "alternateId": "6|6",
                "hasDetails": false,
                "GeometryTag": true,
                "attributes": [
                  [
                    "FILL",
                    false
                  ],
                  [
                    "COLOR",
                    "ffffff"
                  ]
                ],
                "polygonPoints": [
                  {
                    "latitude": 34.96035,
                    "longitude": -119.85452
                  },
                  {
                    "latitude": 34.92052,
                    "longitude": -119.70917
                  },
                  {
                    "latitude": 34.96329,
                    "longitude": -119.69674
                  },
                  {
                    "latitude": 35.00719,
                    "longitude": -119.69352
                  },
                  {
                    "latitude": 35.05088,
                    "longitude": -119.69962
                  },
                  {
                    "latitude": 35.09304,
                    "longitude": -119.71486
                  },
                  {
                    "latitude": 35.0466,
                    "longitude": -119.85752
                  },
                  {
                    "latitude": 35.02553,
                    "longitude": -119.84986
                  },
                  {
                    "latitude": 35.00369,
                    "longitude": -119.84677
                  },
                  {
                    "latitude": 34.98174,
                    "longitude": -119.84834
                  },
                  {
                    "latitude": 34.96035,
                    "longitude": -119.85452
                  }
                ],
                "circleLocation": {},
                "circleRadius": 0.0
              }
            ]
          ]
        ],
        "polygonPoints": [
        ],
        "circleLocation": {},
        "circleRadius": 0.0
      }
    ],
    "tracks": [
    ]
  }};

// So, geoJsonString above becomes this:
// {
//   "type": "FeatureCollection",
//     "features": [
//   {
//     "type":"Feature",
//     "properties": {
//       "style": {
//         "fill": false,
//         "fillColor": "yellow",
//         "color": "yellow",
//         "fillOpacity": 0.5,
//         "opacity": 0.5,
//         "weight": 2
//       },
//       "alternateId": "1|1",
//       "detailLabel": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
//       "hasDetails": "false",
//       "id": "1",
//       "label": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>Source: JEM<br/>Event: Event1",
//       "icon": "images/cbrne_center.png",
//       "hasLevelTwo": "true","levelTwoBody": "NWPN Probability of Fatality;13-Jun-04 04:30:00Z (30.6875 day)<br/>-----<br/>Location: 0S 0W  Altitude: 0 m AGL<br/>-----<br/>Date/Time: Fri Mar 19 16:11:21 GMT 2010<br/>-----<br/>Nuclear Weapon Detonation: Incident 1<br/>-----<br/><br/>Source: JEM",
//       "lat": 35,
//       "lon": -120
//     },
//     "geometry": {
//       "type": "Point",
//       "coordinates": [-120, 35]
//     }
//   }
//   ,
//   {
//     "type":"Feature",
//     "properties": {
//       "style": {
//         "fill": false,
//         "fillColor": "#ff0000",
//         "color": "#ff0000",
//         "fillOpacity": 0.5,
//         "opacity": 0.5,
//         "weight": 2
//       },
//       "alternateId": "1|1",
//       "detailLabel": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
//       "hasDetails": "false",
//       "id": "1",
//       "label": "10% - Fatality Possible (w/meander) - Expected Population: 24<br/>Source: JEM<br/>Event: Event1",
//       "icon": "images/warning.png",
//       "lat": 34.997318,
//       "lon": -119.81619
//     },
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         [
//           [-119.99999,34.978542],
//           [-119.99869,34.978542],
//           [-119.99783,34.978069],
//           [-119.99607,34.978069],
//           [-120.00065,34.980556],
//           [-120.00002,34.979874],
//           [-119.99999,34.978542]
//         ]
//       ]
//     }
//   }
//   ,
//   {
//     "type":"Feature",
//     "properties": {
//       "style": {
//         "fill": false,
//         "fillColor": "#ffffff",
//         "color": "#ffffff",
//         "fillOpacity": 0.5,
//         "opacity": 0.5,
//         "weight": 2
//       },
//       "alternateId": "6|6",
//       "detailLabel": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
//       "hasDetails": "false",
//       "id": "2",
//       "label": "  - %ATP45_1<br/>Source: JEM<br/>Event: Event1",
//       "icon": "images/warning.png",
//       "lat": 35.00719,
//       "lon": -119.69352
//     },
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         [
//           [-119.85452,34.96035],
//           [-119.70917,34.92052],
//           [-119.69674,34.96329],
//           [-119.69352,35.00719],
//           [-119.69962,35.05088],
//           [-119.71486,35.09304],
//           [-119.85752,35.0466],
//           [-119.84986,35.02553],
//           [-119.84677,35.00369],
//           [-119.84834,34.98174],
//           [-119.85452,34.96035]
//         ]
//       ]
//     }
//   }
// ]
// }
