// app.js - FINAL VERSION (Dengan error handling)

console.log('App.js mula loading...');

// DOM Elements - dengan fallback
const formPesanan = document.getElementById('formPesanan');
const namaInput = document.getElementById('namaPelanggan');
const teleponInput = document.getElementById('telepon');
const alamatInput = document.getElementById('alamat');
const jenisSelect = document.getElementById('jenisKerepek'); // ← Pastikan ID ini wujud!

// Cek semua element wujud
if (!formPesanan || !namaInput || !teleponInput || !alamatInput || !jenisSelect) {
    console.error('SALAH: Ada ID form tak jumpa! Cek HTML.');
    console.log('formPesanan:', formPesanan);
    console.log('namaPelanggan:', namaInput);
    console.log('telepon:', teleponInput);
    console.log('alamat:', alamatInput);
    console.log('jenisKerepek:', jenisSelect);
}

// Custom Alert
function showCustomAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 30px; border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000;
        text-align: center; max-width: 90%; font-family: sans-serif;
        border: 3px solid #ff6b6b;
    `;
    alertDiv.innerHTML = `
        <h3 style="color: #ff6b6b; margin: 0 0 15px;">Pesanan Berjaya! 🎉</h3>
        <p style="margin: 0 0 20px; line-height: 1.6; font-size: 15px;">${message}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            background: #ff6b6b; color: white; border: none;
            padding: 10px 25px; border-radius: 8px; cursor: pointer;
            font-weight: bold; font-size: 16px;
        ">OK</button>
    `;
    document.body.appendChild(alertDiv);
}

// Form Submit
formPesanan?.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('FORM DI-SUBMIT!');

    const nama = namaInput.value.trim();
    const telepon = teleponInput.value.trim();
    const alamat = alamatInput.value.trim();
    const jenis = jenisSelect.value;

    // Validation
    if (!nama || !telepon || !alamat || !jenis) {
        showCustomAlert('Sila isi <strong>semua</strong> maklumat!');
        return;
    }

    // Map jenis kerepek
    const kerepekNames = {
        'pisang_pedas': 'Kerepek Pisang Pedas',
        'ubi_manis': 'Kerepek Ubi Manis',
        'sukun_asin': 'Kerepek Sukun Asin',
        'tapioka_pedas': 'Kerepek Tapioka Pedas'
    };

    const kerepekName = kerepekNames[jenis] || jenis;

    showCustomAlert(
        `Terima kasih <strong>${nama}</strong>!<br><br>
        Pesanan anda:<br>
        • <strong>${kerepekName}</strong><br>
        • Telefon: ${telepon}<br>
        • Alamat: ${alamat}<br><br>
        Kami akan hubungi anda segera!`
    );

    formPesanan.reset();
    console.log('Form di-reset');
});

console.log('App.js siap!');
