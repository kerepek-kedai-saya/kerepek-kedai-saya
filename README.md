// Function untuk buat tempahan
document.getElementById('formPesanan').addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('✅ Form submitted! Testing connection...');
    
    // Dapatkan nilai dari form
    const nama = document.getElementById('namaPelanggan').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;
    const jenis = document.getElementById('jenisKerepek').value;
    const kuantiti = document.getElementById('kuantiti').value;
    const nota = document.getElementById('nota').value;
    
    // Kira harga
    const hargaList = {
        'pisang_pedas': 8,
        'ubi_manis': 7, 
        'sukun': 6
    };
    const harga = hargaList[jenis] || 0;
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
    
    alert('Data ready: ' + JSON.stringify(pesananData));
    
    // Hantar ke Firebase
    database.ref('pesanan').push(pesananData)
        .then(() => {
            alert('✅ Tempahan BERJAYA! Data saved to Firebase!');
            document.getElementById('formPesanan').reset();
        })
        .catch((error) => {
            alert('❌ Error: ' + error.message);
        });
});

console.log("Sistem kerepek loaded!");
