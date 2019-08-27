import html2canvas from 'html2canvas';
import './style.less';

html2canvas(document.querySelector("#capture")).then(canvas => {
    //document.body.appendChild(canvas);
    let layersCount = 36;
    let width = canvas.width;
    let height = canvas.height;
    let ctx = canvas.getContext('2d');
    let idata = ctx.getImageData(0,0, width, height);

    let imageslist = [];
    for(let i = 0; i < layersCount; i++){
        imageslist.push(ctx.createImageData(width, height));
    }

    for (let f = 0; f < width; f++){
        for (let k = 0; k < height; k++) {


            for (let l = 0; l < 2; l++) {
                let px = 4 * (k * width + f);
                let m = Math.floor(layersCount * (Math.random() + 2 * f / width) / 3 );
                for (let p = 0; p < 4; p++) {
                    imageslist[m].data[px+p] = idata.data[px+p];
                }
            }

        }
    }

    imageslist.forEach((imageData, i) => {
        let cloned = canvas.cloneNode();
        cloned.style.transition = 'all 1.5s ease-out ' + i / layersCount + 6 + "s";

        cloned.getContext('2d').putImageData(imageData, 0, 0);
        document.body.appendChild(cloned);

        setTimeout(()=>{
           let angle = (Math.random() - 0.5) * 2 * Math.PI;
            let rotateAngle = 15 * (Math.random() - 0.5);
           cloned.style.transform = "rotate(" + rotateAngle + "deg) translate("+ 60 * Math.cos(angle) + "px, " + 60 * Math.sin(angle) + "px)";
           cloned.style.opacity = 0;

        });
    });
});



