let video = document.getElementById('video');
let model;
// calls API getUserMedia
// function getUserMedia return promise with obj MediaStream
const accessCamera = () => {
	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				width: 700,
				height: 600
			},
		})
		.then((stream) => {
			video.srcObject = stream;
		});
};

const detectFaces = async () => {
	const predictio = await model.estimateFaces(video, false);
};

accessCamera();

video.addEventListener('loadeddata', async() => {
	model = await blazeface.load();
	detectFaces();
});