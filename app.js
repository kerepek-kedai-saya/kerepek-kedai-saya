// app.js - SIMPLE DEBUG VERSION
console.log('🔧 App.js mula loading...');

// DOM Elements
const formPesanan = document.getElementById('formPesanan');
console.log('Form element:', formPesanan);

// Form Submission
formPesanan.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('✅ FORM DI-SUBMIT!');
    
    // Get form values
    const nama = document.getElementById('namaPelanggan').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;
    const jenis = document.getElementById('jenisKerepek').value;
    
    console.log('📝 Data dari form:');
    console.log('- Nama:', nama);
    console.log('- Telepon:', telepon);
    console.log('- Alamat:', alamat);
    console.log('- Jenis Kerepek:', jenis);
    
    // Validation
    if (!nama || !telepon || !alamat || !jenis) {
        console.log('❌ Validation failed: Ada field kosong');
        alert('Sila isi semua maklumat!');
        return;
    }
    
    console.log('✅ Validation passed');
    
    // Show simple browser alert
    alert(`TERIMA KASIH ${nama}!\n\nPesanan anda untuk ${jenis} telah berjaya!`);
    
    // Reset form
    formPesanan.reset();
    console.log('🔄 Form telah di-reset');
});

console.log('🎉 App.js siap loading!');
