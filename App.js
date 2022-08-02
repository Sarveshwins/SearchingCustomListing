import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking, Button} from 'react-native';
import * as JsSIP from 'react-native-jssip';
import {
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from 'react-native-webrtc';
import ImagePicker from 'react-native-image-crop-picker';

window.RTCPeerConnection = RTCPeerConnection || window.RTCPeerConnection;
window.RTCIceCandidate = RTCIceCandidate || window.RTCIceCandidate;
window.RTCSessionDescription =
  RTCSessionDescription || window.RTCSessionDescription;
window.MediaStream = MediaStream || window.MediaStream;
window.MediaStreamTrack = MediaStreamTrack || window.MediaStreamTrack;
window.navigator.mediaDevices = mediaDevices || window.navigator.mediaDevices;
window.navigator.getUserMedia =
  mediaDevices.getUserMedia || window.navigator.getUserMedia;

const App = () => {
  const [str, setStr] = useState(null);
  const [strone, setStrone] = useState(null);
  const [videoSourceId, setVideoSourceId] = useState();
  useEffect(() => {}, []);
  var socket = new JsSIP.WebSocketInterface('wss://tele.icc-health.com:7443');
  //socket.via_transport = 'WS';
  var configuration = {
    sockets: [socket],
    uri: 'sip:UR020@tele.icc-health.com',
    password: '123456',
    register: true,
    realm: 'xxxx',
    ha1: 'xxxx',
  };

  var ua = new JsSIP.UA(configuration);
  console.log('awash', ua);
  ua.start();
  ua.on('registered', function (e) {
    console.log('Registered Successfully');
  });

  ua.on('newRTCSession', function (data) {
    var originator = data.originator;
    var request = data.request;
    var session = data.session;
    console.log('session11', session, request, originator);
    // var videoSourceId;

    if (session.originator === 'local') {
      return;
    } // Catch incoming actions only

    if (session.direction === 'incoming') {
      // Answer call

      mediaDevices.enumerateDevices().then(sourceInfos => {
        console.log(sourceInfos);
        var videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == 'front') {
            videoSourceId = sourceInfo.deviceId;
          }
        }

        mediaDevices
          .getUserMedia({
            audio: true,
            video: false,
          })
          .then(stream => {
            console.log('streamstream==', stream);

            var callOptions = {
              mediaConstraints: {
                eventHandlers: eventHandlers,
                audio: true, // only audio calls
                video: false,
              },
              sessionTimersExpires: 120,
              session_timers: false,
              rtcOfferConstraints: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 0,
                googIPv6: false,
              },

              pcConfig: {
                iceServers: [
                  {url: 'stun:stun.xten.com'},
                  {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com',
                  },
                ],
              },
            };
            session?.answer(callOptions);

            // incoming call here

            session.on('progress', function (response, cause) {
              console.log('progress', response, cause);

              // the call has answered
            });

            // session.on('sdp', function (response, cause) {
            //   console.log('accepted', cause, response);
            //   // the call has answered
            // });
            session.on('rejected', function (response, cause) {
              console.log('rejected', response, cause);
              // the call has answered
            });
            session.on('failed', function (response, cause) {
              console.log('failed', response, cause);
              // unable to establish the call
            });

            // session.on('confirmed', function (response, cause) {
            //   console.log('confirmed', response, cause);
            //   // this handler will be called for incoming calls too
            // });
            session.on('sdp', function (response, cause) {
              console.log('sdpbefore', response, cause);

              // dat.sdp = "RTC"
            });

            session.on('addstream', function (e) {
              console.log('addstream2', e);
            });
            session?.connection?.addEventListener(
              'addstream',
              function (response, cause) {
                console.log('addstream===', response, cause);
                console.log(
                  'addstream11===',
                  response?.target?._remoteStreams[0],
                );
                setStr(response?.target?._localStreams[0]);
                setStrone(response?.target?._remoteStreams[0]);
              },
            );
            // session.on('failed', function (dat) {
            //   console.log('failed', dat);
            //   // the call has ended
            // });
            session.on('ended', function (dat) {
              console.log('ended', dat);
              // the call has ended
            });
          })

          .catch(error => {
            console.log('errorerror==', error);
            // Log error
          });
      });

      var eventHandlers = {
        progress: function (e) {
          console.log(e);
          console.log('call is in progress');
        },
        failed: function (e) {
          console.log('++++', e);
          if (e.cause === JsSIP.C.causes.BUSY) {
            alert('BUSY');
          } else if (e.cause === JsSIP.C.causes.REJECTED) {
            alert('REJECTED');
          } else if (e.cause === JsSIP.C.causes.REDIRECTED) {
            alert('REDIRECTED');
          } else if (e.cause === JsSIP.C.causes.UNAVAILABLE) {
            alert('UNAVAILABLE');
          } else if (e.cause === JsSIP.C.causes.NOT_FOUND) {
            alert('NOT_FOUND');
          } else if (e.cause === JsSIP.C.causes.ADDRESS_INCOMPLETE) {
            alert('ADDRESS_INCOMPLETE');
          } else if (e.cause === JsSIP.C.causes.INCOMPATIBLE_SDP) {
            alert('INCOMPATIBLE_SDP');
          } else if (e.cause === JsSIP.C.causes.MISSING_SDP) {
            alert('INCOMPATIBLE_SDP');
          } else {
            alert('AUTHENTICATION_ERROR');
          }
        },
        ended: function (e) {
          console.log(e);
          if (e.cause === JsSIP.C.causes.BYE) {
            alert('BYE');
          } else if (e.cause === JsSIP.C.causes.CANCELED) {
            alert('CANCELED');
          } else if (e.cause === JsSIP.C.causes.NO_ANSWER) {
            alert('NO_ANSWER');
          } else if (e.cause === JsSIP.C.causes.EXPIRES) {
            alert('EXPIRES');
          } else if (e.cause === JsSIP.C.causes.NO_ACK) {
            alert('NO_ACK');
          } else if (e.cause === JsSIP.C.causes.DIALOG_ERROR) {
            alert('DIALOG_ERROR');
          } else if (e.cause === JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS) {
            alert('USER_DENIED_MEDIA_ACCESS');
          } else if (e.cause === JsSIP.C.causes.BAD_MEDIA_DESCRIPTION) {
            alert('BAD_MEDIA_DESCRIPTION');
          } else {
            alert('RTP_TIMEOUT');
          }
          console.log('call ended with cause: ');
        },
        confirmed: function (e) {
          console.log('call confirmed');
        },
      };
    } else if (session.direction === 'outgoing') {
    }
  });

  var eventHandlers = {
    progress: function (e) {
      console.log(e);
      console.log('call is in progress');
    },
    failed: function (e) {
      console.log('++++', e);
      if (e.cause === JsSIP.C.causes.BUSY) {
        alert('BUSY');
      } else if (e.cause === JsSIP.C.causes.REJECTED) {
        alert('REJECTED');
      } else if (e.cause === JsSIP.C.causes.REDIRECTED) {
        alert('REDIRECTED');
      } else if (e.cause === JsSIP.C.causes.UNAVAILABLE) {
        alert('UNAVAILABLE');
      } else if (e.cause === JsSIP.C.causes.NOT_FOUND) {
        alert('NOT_FOUND');
      } else if (e.cause === JsSIP.C.causes.ADDRESS_INCOMPLETE) {
        alert('ADDRESS_INCOMPLETE');
      } else if (e.cause === JsSIP.C.causes.INCOMPATIBLE_SDP) {
        alert('INCOMPATIBLE_SDP');
      } else if (e.cause === JsSIP.C.causes.MISSING_SDP) {
        alert('INCOMPATIBLE_SDP');
      } else {
        alert('AUTHENTICATION_ERROR');
      }
    },
    ended: function (e) {
      console.log(e);
      if (e.cause === JsSIP.C.causes.BYE) {
        alert('BYE');
      } else if (e.cause === JsSIP.C.causes.CANCELED) {
        alert('CANCELED');
      } else if (e.cause === JsSIP.C.causes.NO_ANSWER) {
        alert('NO_ANSWER');
      } else if (e.cause === JsSIP.C.causes.EXPIRES) {
        alert('EXPIRES');
      } else if (e.cause === JsSIP.C.causes.NO_ACK) {
        alert('NO_ACK');
      } else if (e.cause === JsSIP.C.causes.DIALOG_ERROR) {
        alert('DIALOG_ERROR');
      } else if (e.cause === JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS) {
        alert('USER_DENIED_MEDIA_ACCESS');
      } else if (e.cause === JsSIP.C.causes.BAD_MEDIA_DESCRIPTION) {
        alert('BAD_MEDIA_DESCRIPTION');
      } else {
        alert('RTP_TIMEOUT');
      }
      console.log('call ended with cause: ');
    },
    confirmed: function (e) {
      console.log('call confirmed');
    },
  };

  var options = {
    eventHandlers: eventHandlers,
    mediaConstraints: {audio: true, video: false},
    sessionTimersExpires: 120,
    session_timers: false,
    rtcOfferConstraints: {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 0,
    },
    pcConfig: {
      iceServers: [
        {url: 'stun:stun.xten.com'},
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com',
        },
      ],
    },
  };
  const onPress = () => {
    var session = setTimeout(() => {
      ua.call('sip:UR02@tele.icc-health.com', options);
    }, 150);
    console.log('session', session);
  };

  const onPresscall = () => {
    var session = setTimeout(() => {
      ua.call('sip:UR021@tele.icc-health.com', options);
    }, 150);
    console.log('session', session);
  };

  // var session =   setTimeout(() => {ua.call('sip:1004@ditstekosdev.com', options)}, 150)
  // console.log('session', session);
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      useFrontCamera: true,
    })
      .then(image => {
        const file = {
          uri: image.path,
          type: image.mime,
          name: 'uploadImage',
        };
        // sendRequest(file, token).then((response) => {
        //   UpdateProfilePicture(response.filename);
        // });
      })
      .catch(error => {
        console.log('camera operation failed');
      });
  };
  return (
    <View
      style={{
        //backgroundColor: 'blue',
        flex: 1,
      }}>
      {/* <WebView
        style={{flex: 1}}
        scrollEnabled={false}
        source={{uri: 'https://ditstekdemo.com/virtare/sipml5/'}}
      /> */}

      {/* <TouchableOpacity
        style={{
          height: 50,
          width: '80%',
          backgroundColor: 'red',
          alignSelf: 'center',
          alignItems: 'center',
          top: 90,
          justifyContent: 'center',
          marginTop: '3%',
        }}
        activeOpacity={0.9}
        onPress={() => onPress()}>
        <Text>Call</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          height: 50,
          width: '80%',
          top: 90,
          backgroundColor: 'red',
          justifyContent: 'center',
          marginTop: '3%',
          alignSelf: 'center',

          alignItems: 'center',
        }}
        activeOpacity={0.9}
        onPress={() => openCamera()}>
        <Text>openCamera</Text>
      </TouchableOpacity>
      <View
        style={{
          height: 150,
          width: '80%',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        {str && (
          <RTCView
            streamURL={str?.toURL?.()}
            objectFit="contain"
            style={{
              width: '100%',
              height: '60%',
              backgroundColor: 'black',
            }}
          />
        )}
      </View>
      <View
        style={{
          height: 150,
          width: '80%',
          justifyContent: 'center',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        {strone && (
          <RTCView
            streamURL={strone?.toURL?.()}
            objectFit="contain"
            style={{
              width: '100%',
              height: '60%',
              backgroundColor: 'grey',
            }}
          />
        )}
      </View>
    </View>
  );
};

export default App;
