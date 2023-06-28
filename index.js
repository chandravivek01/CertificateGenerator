const generatePDF = async (name) =>  {
    const {PDFDocument, rgb } = PDFLib;

    const exBytes = await fetch("certi.pdf").then( (res) => {
        return res.arrayBuffer();
    });
    
    const exFont = await fetch("Sanchez-Regular.ttf").then( (res) => {
        return res.arrayBuffer();
    })

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    firstPg.drawText(name, {
        x: 300,
        y: 320,
        size: 25,
        // font: myFont
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true}); 
    saveAs(uri, "Certificate.pdf", { autoBom: true})
    //document.querySelector("#mypdf").src = uri;
};

const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");
submitBtn.addEventListener("click", () => {
    const val = inputVal.value; 
    generatePDF(val);
});

