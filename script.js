const btnEncrypt = document.getElementById('btnEncrypt');
const btnDecrypt = document.getElementById('btnDecrypt');
const textAreaInput = document.getElementById('textArea');
const textAreaOutput = document.getElementById('textAreaOutput');
const btnCopy = document.getElementById('copy');
const preUncrypt = document.getElementsByClassName("preuncrypt");
const llavesEncriptacion = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

textAreaInput.addEventListener("input", validarTexto);
btnEncrypt.onclick = encrypt; 
btnDecrypt.onclick = decrypt;
btnCopy.onclick = copyResult;


function validarTexto() {
    if (textAreaInput.value === "") {
      mostrarTexto("block", "none");
      return;
    }

    const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
    const cleanedText = textAreaInput.value.replace(regex, "");
    textAreaInput.value = cleanedText;
}

function encrypt(){
    if (textAreaInput.value !== ""){
        const text = textAreaInput.value;
        let encrypted = text;
        for (const key in llavesEncriptacion) {
            const regex = new RegExp(key, "g");
            encrypted = encrypted.replace(regex, llavesEncriptacion[key]);
        }
        resultado(encrypted);
    }
}

function decrypt(){
    if (textAreaInput.value !== ""){
        const text = textAreaInput.value;
        let encrypted = text;
        for (const key in llavesEncriptacion) {
            const regex = new RegExp(llavesEncriptacion[key], "g");
            encrypted = encrypted.replace(regex, key);
        }
        resultado(encrypted);
    }
}

function resultado(text){
    textAreaOutput.value = text;
    mostrarTexto("none", "block");
}

function copyResult(){
    textAreaOutput.select();
    if (!navigator.clipboard) {
        document.execCommand("copy");
        return 
    }
    navigator.clipboard.writeText(textAreaOutput.value);
}



function mostrarTexto(style1, style2){
    for (let i = 0; i < preUncrypt.length; i++) {
      preUncrypt[i].style.display = style1;
    }
    textAreaOutput.style.display = style2;
    btnCopy.style.display = style2;
}