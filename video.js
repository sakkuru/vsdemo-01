navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    console.log(stream);

    $('video').attr('src', URL.createObjectURL(stream));

    const peer = new Peer({ key: "7bd9167d-0a3d-4ce9-bf60-555e474c3e85" });
    peer.on('open', () => {
      const sfuRoom = peer.joinRoom(location.pathname.slice(1), { mode: 'sfu', stream: stream });
      sfuRoom.on('stream', remoteStream => {
        const streamURL = URL.createObjectURL(remoteStream);
        const remoteId = remoteStream.peerId;
        $('#videos').append(
          '<video autoplay class="remoteVideos" src=' + streamURL + ' id="video_' + remoteId + '">'
        );
      });
      sfuRoom.on('removeStream', stream => {
        $('#video_' + stream.peerId).remove();
      });
    });


  })