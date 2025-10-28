// Firebase configuration - GANTI DENGAN CONFIG ANDA
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const formPesanan = document.getElementById('formPesanan');
const statusMessage = document.getElementById('statusMessage');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeKerepekSelection();
    initializeFormSubmission();
});

// Kerepek selection functionality
function initializeKerepekSelection() {
    const kerepekItems = document.querySelectorAll('.kerepek-item');
    const jenisKerepekInput = document.getElementById('jenisKerepek');
    const hargaKerepekInput = document.getElementById('hargaKerepek');
    
    kerepekItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all items
            kerepekItems.forEach(i => i.classList.remove('selected'));
            
            // Add selected class to clicked item
            this.classList.add('selected');
            
            // Set the hidden input values
            if (jenisKerepekInput) {
                jenisKerepekInput.value = this.getAttribute('data-value');
            }
            if (hargaKerepekInput) {
                hargaKerepekInput.value = this.getAttribute('data-price');
            }
            
            console.log('Kerepek dipilih:', this.getAttribute('data-value'));
        });
    });
}

// Form submission functionality
function initializeFormSubmission() {
    if (!formPesanan) {
        console.error('Form pesanan tidak ditemui!');
        return;
    }
    
    formPesanan.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form dihantar...');
        
        // Get form values
        const nama = document.getElementById('namaPelanggan').value;
        const telepon = document.getElementById('telepon').value;
        const alamat = document.getElementById('alamat').value;
        const jenisKerepekInput = document.getElementById('jenisKerepek');
        const hargaKerepekInput = document.getElementById('hargaKerepek');
        
        const jenis = jenisKerepekInput ? jenisKerepekInput.value : '';
        const harga = hargaKerepekInput ? hargaKerepekInput.value : '';
        
        console.log('Data form:', { nama, telepon, alamat, jenis, harga });
        
        // Validate form
        if (!nama || !telepon || !alamat) {
            showAlert('Ralat', 'Sila isi semua maklumat peribadi!', 'error');
            return;
        }
        
        if (!jenis) {
            showAlert('Ralat', 'Sila pilih jenis kerepek!', 'error');
            return;
        }
        
        // Show loading
        showStatus('Menghantar data ke Firebase...', 'loading');
        
        // Create order object
        const pesanan = {
            nama: nama,
            telepon: telepon,
            alamat: alamat,
            jenisKerepek: jenis,
            harga: harga,
            tarikh: new Date().toISOString(),
            status: 'baru'
        };
        
        // Send to Firebase
        db.collection('pesanan').add(pesanan)
            .then((docRef) => {
                console.log('Pesanan berjaya! ID:', docRef.id);
                showStatus('Pesanan berjaya dihantar!', 'success');
                
                // Show success alert
                showAlert(
                    'Pesanan Berjaya! 🎉', 
                    `Terima kasih ${nama}!\n\nPesanan anda untuk ${getKerepekName(jenis)} telah berjaya dihantar.\n\nID Pesanan: ${docRef.id}\nHarga: RM${harga}\n\nKami akan hubungi anda tidak lama lagi.`,
                    'success'
                );
                
                // Reset form
                formPesanan.reset();
                document.querySelectorAll('.kerepek-item').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Reset hidden inputs
                if (jenisKerepekInput) jenisKerepekInput.value = '';
                if (hargaKerepekInput) hargaKerepekInput.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                showStatus('Ralat menghantar pesanan!', 'error');
                showAlert(
                    'Ralat 😔', 
                    'Maaf, terdapat masalah teknikal menghantar pesanan anda. Sila cuba lagi atau hubungi kami terus.\n\nError: ' + error.message,
                    'error'
                );
            });
    });
}

// Function to show status message
function showStatus(message, type) {
    if (statusMessage) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        statusMessage.style.display = 'block';
        
        // Auto hide success messages
        if (type === 'success') {
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Function to show custom alert
function showAlert(title, message, type) {
    // Create alert element if not exists
    let alertDiv = document.getElementById('customAlert');
    
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.id = 'customAlert';
        alertDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const alertContent = document.createElement('div');
        alertContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
            text-align: center;
        `;
        
        const alertTitle = document.createElement('div');
        alertTitle.id = 'alertTitle';
        alertTitle.style.cssText = `
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 15px;
            color: #ff6b6b;
        `;
        
        const alertMessage = document.createElement('div');
        alertMessage.id = 'alertMessage';
        alertMessage.style.cssText = `
            margin-bottom: 20px;
            line-height: 1.5;
            white-space: pre-line;
        `;
        
        const alertButton = document.createElement('button');
        alertButton.textContent = 'OK';
        alertButton.style.cssText = `
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        `;
        alertButton.onclick = function() {
            document.body.removeChild(alertDiv);
        };
        
        alertContent.appendChild(alertTitle);
        alertContent.appendChild(alertMessage);
        alertContent.appendChild(alertButton);
        alertDiv.appendChild(alertContent);
        document.body.appendChild(alertDiv);
    }
    
    // Set alert content
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertMessage').textContent = message;
    
    // Set color based on type
    const titleElement = document.getElementById('alertTitle');
    if (type === 'success') {
        titleElement.style.color = '#2ecc71';
    } else if (type === 'error') {
        titleElement.style.color = '#e74c3c';
    } else {
        titleElement.style.color = '#ff6b6b';
    }
    
    alertDiv.style.display = 'flex';
}

// Helper function to get kerepek name
function getKerepekName(value) {
    const kerepekMap = {
        'pisang_pedas': 'Kerepek Pisang Pedas',
        'ubi_manis': 'Kerepek Ubi Manis',
        'sukun_asin': 'Kerepek Sukun Asin',
        'tapioka_pedas': 'Kerepek Tapioka Pedas'
    };
    return kerepekMap[value] || 'Kerepek';
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeFormSubmission, showAlert, showStatus };
}
