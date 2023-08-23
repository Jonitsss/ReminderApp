//use este bucle para ahorrarme 30 lineas en html
let dropdown = document.getElementById('select-day')

for (let i = 1; i < 30; i++) {
    let option = document.createElement('option');
    option.value = i+1;
    option.text = i+1 + ' días';
    dropdown.appendChild(option);
}