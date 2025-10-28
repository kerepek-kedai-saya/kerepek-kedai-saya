// Function untuk buat tempahan
document.getElementById('formPesanan').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Dapatkan nilai dari form
    const nama = document.getElementById('namaPelanggan').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;
    const jenis = document.getElementById('jenisKerepek').value;
    const kuantiti = document.getElementById('kuantiti').value;
    const nota = document.getElementById('nota').value;
    
    // Kira harga
    const harga = {
        'pisang_pedas': 8,
        'ubi_manis': 7, 
        'sukun': 6
    }[jenis] || 0;
    
    const total = harga * kuantiti;
    
    // Buat data pesanan
    const pesananData = {
        nama: nama,
        telepon: telepon,
        alamat: alamat,
        jenis: jenis,
        kuantiti: parseInt(kuantiti),
        harga: harga,
        total: total,
        status: "dalam_proses",
        tarikh: new Date().toISOString(),
        nota: nota
    };
    
    // Hantar ke Firebase
    database.ref('pesanan').push(pesananData)
        .then(() => {
            showMessage('✅ Tempahan BERJAYA! Terima kasih!');
            document.getElementById('formPesanan').reset();
        })
        .catch((error) => {
            showMessage('❌ Error: ' + error.message);
        });
});

// Function tunjuk message
function showMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="success">${msg}</div>`;
    
    // Hilang selepas 5 saat
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

console.log("Sistem kerepek sudah siap! 🎉");