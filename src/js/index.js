import html2canvas from 'html2canvas';
import '../style/style.less';

const createMask = ()=> {
    html2canvas(document.querySelector("#capture", {allowTaint : false, useCORS: true})).then(canvas => {
        //document.body.appendChild(canvas);
        document.querySelector('#capture .content').innerHTML = '';
        let layersCount = 32;
        let width = canvas.width;
        let height = canvas.height;
        let ctx = canvas.getContext('2d');
        let idata = ctx.getImageData(0, 0, width, height);

        let imageslist = [];
        for(let i = 0; i < layersCount; i++) {
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
            document.getElementById('capture').appendChild(cloned);

            requestAnimationFrame(()=>{
                let angle = (Math.random() - 0.5) * 2 * Math.PI;
                let rotateAngle = 15 * (Math.random() - 0.5);
                cloned.style.transform = "rotate(" + rotateAngle + "deg) translate("+ 60 * Math.cos(angle) + "px, " + 60 * Math.sin(angle) + "px) rotate(" + rotateAngle + "deg)";
                cloned.style.opacity = 0;

            },);
        });
    });
}

const removeBtn = document.getElementById('btn-remove');
removeBtn.addEventListener('click', (event)=>{
   createMask(event);
});


