<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kedai Kerepek</title>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 30px 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        h2 {
            font-size: 1.8rem;
            margin-bottom: 20px;
            color: #ff6b6b;
        }
        
        .card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }
        
        input, select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: border 0.3s;
        }
        
        input:focus, select:focus {
            border-color: #ff6b6b;
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
        }
        
        .kerepek-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .kerepek-item {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .kerepek-item:hover {
            border-color: #ff6b6b;
            background-color: #fff5f5;
        }
        
        .kerepek-item.selected {
            border-color: #ff6b6b;
            background-color: #ffecec;
        }
        
        .kerepek-price {
            font-weight: bold;
            color: #ff6b6b;
            margin-top: 5px;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            color: white;
            border: none;
            padding: 14px 25px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            text-align: center;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .status-message {
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
            font-weight: 600;
            display: none;
        }
        
        .success {
            background-color: #e7f7ef;
            color: #2ecc71;
            border: 1px solid #2ecc71;
        }
        
        .error {
            background-color: #fde8e8;
            color: #e74c3c;
            border: 1px solid #e74c3c;
        }
        
        .loading {
            background-color: #e8f4fd;
            color: #3498db;
            border: 1px solid #3498db;
        }
        
        footer {
            text-align: center;
            margin-top: 40px;
            color: #777;
            font-size: 14px;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .kerepek-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Kedai Kerepek</h1>
            <p>Kerepek Terbaik, Harga Terjangkau</p>
        </header>
        
        <div class="card">
            <h2>Buat Pesanan</h2>
            <form id="formPesanan">
                <div class="form-group">
                    <label for="namaPelanggan">Nama Pelanggan:</label>
                    <input type="text" id="namaPelanggan" placeholder="Masukkan nama anda" required>
                </div>
                
                <div class="form-group">
                    <label for="telepon">Nombor Telefon:</label>
                    <input type="tel" id="telepon" placeholder="Contoh: 0123456789" required>
                </div>
                
                <div class="form-group">
                    <label for="alamat">Alamat Penghantaran:</label>
                    <input type="text" id="alamat" placeholder="Masukkan alamat lengkap" required>
                </div>
                
                <div class="form-group">
                    <label>Jenis Kerepek:</label>
                    <div class="kerepek-list">
                        <div class="kerepek-item" data-value="pisang_pedas" data-price="8">
                            <div>Kerepek Pisang Pedas</div>
                            <div class="kerepek-price">RM8</div>
                        </div>
                        <div class="kerepek-item" data-value="ubi_manis" data-price="7">
                            <div>Kerepek Ubi Manis</div>
                            <div class="kerepek-price">RM7</div>
                        </div>
                        <div class="kerepek-item" data-value="sukun_asin" data-price="9">
                            <div>Kerepek Sukun Asin</div>
                            <div class="kerepek-price">RM9</div>
                        </div>
                        <div class="kerepek-item" data-value="tapioka_pedas" data-price="6">
                            <div>Kerepek Tapioka Pedas</div>
                            <div class="kerepek-price">RM6</div>
                        </div>
                    </div>
                    <input type="hidden" id="jenisKerepek" required>
                    <input type="hidden" id="hargaKerepek">
                </div>
                
                <button type="submit" class="btn">Hantar Pesanan</button>
            </form>
            
            <div id="statusMessage" class="status-message">
                Menghantar data ke Firebase...
            </div>
        </div>
        
        <footer>
            <p>© 2023 Kedai Kerepek. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Firebase configuration (replace with your actual config)
        const firebaseConfig = {
            apiKey: "your-api-key",
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
        const jenisKerepekInput = document.getElementById('jenisKerepek');
        const hargaKerepekInput = document.getElementById('hargaKerepek');
        
        // Kerepek selection
        const kerepekItems = document.querySelectorAll('.kerepek-item');
        kerepekItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected class from all items
                kerepekItems.forEach(i => i.classList.remove('selected'));
                
                // Add selected class to clicked item
                item.classList.add('selected');
                
                // Set the hidden input values
                jenisKerepekInput.value = item.getAttribute('data-value');
                hargaKerepekInput.value = item.getAttribute('data-price');
            });
        });

        // Form submission
        formPesanan.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nama = document.getElementById('namaPelanggan').value;
            const telepon = document.getElementById('telepon').value;
            const alamat = document.getElementById('alamat').value;
            const jenis = jenisKerepekInput.value;
            const harga = hargaKerepekInput.value;
            
            // Validate kerepek selection
            if (!jenis) {
                showStatus('Sila pilih jenis kerepek', 'error');
                return;
            }
            
            // Show loading message
            showStatus('Menghantar data ke Firebase...', 'loading');
            
            // Create order object
            const pesanan = {
                nama: nama,
                telepon: telepon,
                alamat: alamat,
                jenisKerepek: jenis,
                harga: harga,
                tarikh: new Date().toISOString()
            };
            
            // Add to Firestore
            db.collection('pesanan').add(pesanan)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    showStatus('Pesanan berjaya dihantar! ID: ' + docRef.id, 'success');
                    formPesanan.reset();
                    kerepekItems.forEach(item => item.classList.remove('selected'));
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                    showStatus('Ralat menghantar pesanan: ' + error.message, 'error');
                });
        });
        
        // Function to show status message
        function showStatus(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = 'status-message ' + type;
            statusMessage.style.display = 'block';
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 5000);
            }
        }
    </script>
</body>
</html>
