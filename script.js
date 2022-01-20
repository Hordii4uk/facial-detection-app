let video = document.getElementById("video");
let model;
// declaring the canvas variable and setting the context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const accessCamera = () => {
	navigator.mediaDevices
		.getUserMedia({
			video: {
				width: 500,
				height: 400
			},
			audio: false,
		})
		.then((stream) => {
			video.srcObject = stream;
		});
};

const detectFaces = async () => {
	const prediction = await model.estimateFaces(video, false);

	// using canvas to paint videos
	ctx.drawImage(video, 0, 0, 500, 400);

	prediction.forEach((predictions) => {
		// draw a rectangle that will define the face
		ctx.beginPath();
		ctx.lineWidth = "4";
		ctx.strokeStyle = "yellow";
		ctx.rect(
			predictions.topLeft[0],
			predictions.topLeft[1],
			predictions.bottomRight[0] - predictions.topLeft[0],
			predictions.bottomRight[1] - predictions.topLeft[1]
		);
		// the last two arguments are the width and height,
		// but since blazeface models only return coordinates,
		// we have to subtract them to get the width and height
		ctx.stroke();
	});
};

accessCamera();
video.addEventListener("loadeddata", async () => {
	model = await blazeface.load();
	// Calling the detectFaces function every 40 milliseconds
	setInterval(detectFaces, 40);
});