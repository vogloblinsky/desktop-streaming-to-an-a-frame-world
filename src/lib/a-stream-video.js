AFRAME.registerPrimitive('a-stream-video', {
    defaultComponents: {
        asvideo: {},
    },
    mappings: {
        src: 'asvideo.src',
        width: 'asvideo.width',
        height: 'asvideo.height',
        'o-width': 'asvideo.o-width',
        'o-height': 'asvideo.o-height'
    }
});
AFRAME.registerComponent('asvideo', {
    schema: {
        src: {
            default: ''
        },
        width: {
            default: ''
        },
        height: {
            default: ''
        },
        'o-width': {
            default: ''
        },
        'o-height': {
            default: ''
        }
    },
    init: function() {
        var el = this.el,
            data = this.data,
            scene = this.el.sceneEl.object3D;
        var video, videoImage, videoImageContext, videoTexture;

        var videoWidth = data['o-width'],
            videoHeight = data['o-height'];

        video = document.createElement('video');
        video.type = 'video/ogg; codecs="theora, vorbis"';
        video.name = 'asvideo';

        video.src = data.src;

        video.crossOrigin = 'Anonymous';
        video.load();

        videoImage = document.createElement('canvas');
        videoImage.width = videoWidth;
        videoImage.height = videoHeight;

        videoImageContext = videoImage.getContext('2d');
        // background color if no video present
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

        videoTexture = new THREE.Texture(videoImage);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        var movieMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            overdraw: true,
            side: THREE.DoubleSide
        });

        var movieGeometry = new THREE.PlaneGeometry(data.width, data.height, 4, 4);

        var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
        movieScreen.position.set(0, 0, 0);

        el.setObject3D('moviescreen', movieScreen);

        video.addEventListener('canplay', function() {
            console.log('canplay');
            video.play();
            animate();
        });

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                videoImageContext.drawImage(video, 0, 0, videoWidth, videoHeight);
                if (videoTexture)
                    videoTexture.needsUpdate = true;
            }
        }
    }
});
