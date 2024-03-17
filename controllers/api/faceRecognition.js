const faceapi = require('face-api.js');

const getFaceData = async (input)=>
{
    console.log(faceapi.nets);
    const detections = await faceapi.detectAllFaces(input)
    console.log(detections);
}

const storeFaceToDB = (faceData)=>
{

}

const findFacesInImages = (faceIDArr,ImgArr) =>
{

}