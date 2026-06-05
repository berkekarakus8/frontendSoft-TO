console.log("JS DOSYASI YÜKLENDİ");

window.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bilgi-formu");

    if (!form) {
        console.log("FORM BULUNAMADI!");
        return;
    }

    console.log("FORM BULUNDU");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("SUBMIT YAKALANDI");

        const isim = document.getElementById("isim").value;
        const soyisim = document.getElementById("soyisim").value;
        const tel = document.getElementById("tel").value;
        const resimInput = document.getElementById("resim");

        const resimDosyasi = resimInput.files[0];

        form.style.display = "none";

        const container = document.createElement("div");

        container.innerHTML = `
            <h2>${isim}</h2>
            <h2>${soyisim}</h2>
            <h2>${tel}</h2>
            <img id="img" style="max-width:300px;">
        `;

        document.body.appendChild(container);

        if (resimDosyasi) {
            const reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById("img").src = e.target.result;
            };

            reader.readAsDataURL(resimDosyasi);
        }
    });

});