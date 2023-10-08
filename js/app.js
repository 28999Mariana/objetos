document.addEventListener('DOMContentLoaded', function() {

    const swictherTheme = document.querySelector('.main__check');
    const root = document.documentElement;

    if(root.getAttribute('data-theme') === 'dark'){
      swictherTheme.checked = true;      
    } 

    function toggleTheme(){
        
        const setTheme = this.checked ? 'dark' : 'light';
        root.setAttribute('data-theme', setTheme);
    
        localStorage.setItem('theme', setTheme);
    }
    

    swictherTheme.addEventListener('click', toggleTheme);

});


//Ejercitación: Objetos
// Función constructora para el objeto Curso
function Curso() {
    this.criticas = [];
    this.ratingPromedio = 0;
}

// Función para agregar críticas al curso
Curso.prototype.agregarCritica = function(critica) {
    this.criticas.push(critica);
    this.calcularRatingPromedio(); // Llamo a la función para recalcular el rating
}

// Función para calcular el rating promedio
Curso.prototype.calcularRatingPromedio = function() {
    if (this.criticas.length > 0) {
        const total = this.criticas.reduce((acumulador, critica) => acumulador + critica, 0);
        this.ratingPromedio = total / this.criticas.length;
    }
}

// Función para mostrar la información del curso
Curso.prototype.mostrarInformacion = function() {
    const info = `Título: Programación 2.0\nTotal de Críticas: ${this.criticas.length}\nRating Promedio: ${this.ratingPromedio.toFixed(2)}`;
    return info;
}

// Creo instancia del curso
const miCurso = new Curso();

// Función para mostrar SweetAlert al agregar crítica con selección de ranking
function agregarCriticaRankingSweetAlert(curso) {
    const rankings = {
        1: 'Regular',
        2: 'Malo',
        3: 'Bueno',
        4: 'Muy Bueno',
        5: 'Excelente'
    };

    Swal.fire({
        title: 'Agregar Crítica',
        input: 'select',
        inputOptions: rankings,
        inputPlaceholder: 'Selecciona un ranking',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Debes seleccionar un ranking';
            }
            const ranking = parseInt(value);
            curso.agregarCritica(ranking);
            curso.calcularRatingPromedio(); // Recalcula el rating
            return null;
        },
        icon: 'info',
        confirmButtonText: 'Agregar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Muestro SweetAlert de agradecimiento
            Swal.fire(
                '¡Crítica Agregada!',
                'Gracias por tu opinión.',
                'success'
            )
        }
    });
}

// Evento click relacionado con la función de SweetAlert para agregar crítica con selección de ranking
document.getElementById('agregarCriticaBtn').addEventListener('click', () => {
    agregarCriticaRankingSweetAlert(miCurso);
});

// Evento click relacionado con la función para mostrar información
document.getElementById('mostrarInformacionBtn').addEventListener('click', () => {
    //SweetAlert con la información del curso
    Swal.fire({
        title: 'Información del Curso',
        text: miCurso.mostrarInformacion(),
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
});



//Generador QR
const pagos = document.querySelector(".pagos"),
    qrInput = pagos.querySelector(".form-qr input"),
    generateBtn = pagos.querySelector(".form-qr button"),
    qrImg = pagos.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        pagos.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        pagos.classList.remove("active");
        preValue = "";
    }
});