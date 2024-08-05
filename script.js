
    let pemasukanBulanan = 0; // Contoh nilai pemasukan bulanan
    let budget = [];
    let daftarPemasukan = [];
    let daftarPengeluaran = [];

    function inputPemasukan() {
        let kategori = document.getElementById('kategoriPemasukan').value;
        let nominal = parseFloat(document.getElementById('nominalPemasukan').value);
        let tanggal = document.getElementById('tanggalPemasukan').value;

        if (kategori.trim() === '' || isNaN(nominal) || nominal <= 0 || tanggal === '') {
            alert('Mohon lengkapi semua kolom input pemasukan dengan benar!');
            return;
        }

        let pemasukanBaru = { kategori: kategori, nominal: nominal, tanggal: tanggal };
        daftarPemasukan.push(pemasukanBaru);

        document.getElementById('kategoriPemasukan').value = '';
        document.getElementById('nominalPemasukan').value = '';
        document.getElementById('tanggalPemasukan').value = '';

        tampilkanTabelPemasukan();
        hitungSisaUang();
    }

    function inputPengeluaran() {
    let kategori = document.getElementById('kategoriPengeluaran').value;
    let nominal = parseFloat(document.getElementById('nominalPengeluaran').value);
    let tanggal = document.getElementById('tanggalPengeluaran').value;

    if (kategori.trim() === '' || isNaN(nominal) || nominal <= 0 || tanggal === '') {
        alert('Mohon lengkapi semua kolom input pengeluaran dengan benar!');
        return;
    }

    if (nominal > budget[kategori]) {
        alert('Nominal pengeluaran melebihi budget!');
        return;
    }

    let pengeluaranBaru = { kategori: kategori, nominal: nominal, tanggal: tanggal };
    daftarPengeluaran.push(pengeluaranBaru);
    budget[kategori] -= nominal;

    document.getElementById('nominalPengeluaran').value = '';
    document.getElementById('tanggalPengeluaran').value = '';

    tampilkanTabelPengeluaran();
    tampilkanTabelSisaBudget();
    hitungSisaUang();
}


    function tampilkanTabelPemasukan() {
        let tabelHTML = '<table border="1"><tr><th>Kategori</th><th>Nominal</th><th>Tanggal</th><th>Aksi</th></tr>';
        daftarPemasukan.forEach((pemasukan, index) => {
            tabelHTML += `<tr><td>${pemasukan.kategori}</td><td>Rp ${pemasukan.nominal}</td><td>${pemasukan.tanggal}</td><td><button onclick="editPemasukan(${index})">Edit</button><button onclick="hapusPemasukan(${index})">Hapus</button></td></tr>`;
        });
        tabelHTML += '</table>';
        document.getElementById('daftarPemasukan').innerHTML = tabelHTML;
    }

    function tampilkanTabelPengeluaran() {
        let tabelHTML = '<table border="1"><tr><th>Kategori</th><th>Nominal</th><th>Tanggal</th><th>Aksi</th></tr>';
        daftarPengeluaran.forEach((pengeluaran, index) => {
            tabelHTML += `<tr><td>${pengeluaran.kategori}</td><td>Rp ${pengeluaran.nominal}</td><td>${pengeluaran.tanggal}</td><td><button onclick="editPengeluaran(${index})">Edit</button><button onclick="hapusPengeluaran(${index})">Hapus</button></td></tr>`;
        });
        tabelHTML += '</table>';
        document.getElementById('daftarPengeluaran').innerHTML = tabelHTML;
    }

    function editPemasukan(index) {
        let pemasukan = daftarPemasukan[index];
        document.getElementById('kategoriPemasukan').value = pemasukan.kategori;
        document.getElementById('nominalPemasukan').value = pemasukan.nominal;
        document.getElementById('tanggalPemasukan').value = pemasukan.tanggal;

        // Hapus pemasukan yang akan diedit dari array
        daftarPemasukan.splice(index, 1);

        tampilkanTabelPemasukan();
        hitungSisaUang();
    }

    function hapusPemasukan(index) {
        daftarPemasukan.splice(index, 1);
        tampilkanTabelPemasukan();
        hitungSisaUang();
    }

    function editPengeluaran(index) {
        let pengeluaran = daftarPengeluaran[index];
        document.getElementById('kategoriPengeluaran').value = pengeluaran.kategori;
        document.getElementById('nominalPengeluaran').value = pengeluaran.nominal;
        document.getElementById('tanggalPengeluaran').value = pengeluaran.tanggal;

        // Hapus pengeluaran yang akan diedit dari array
        daftarPengeluaran.splice(index, 1);
        budget[pengeluaran.kategori] += pengeluaran.nominal;

        tampilkanTabelPengeluaran();
        tampilkanTabelSisaBudget();
        hitungSisaUang();
    }

    function hapusPengeluaran(index) {
        let pengeluaran = daftarPengeluaran[index];
        daftarPengeluaran.splice(index, 1);
        budget[pengeluaran.kategori] += pengeluaran.nominal;

        tampilkanTabelPengeluaran();
        tampilkanTabelSisaBudget();
        hitungSisaUang();
    }
    
                                      
    function tampilkanTabelSisaBudget() {
    let tabelHTML = '<h2 class="mb-3">Persen Budget</h2><table class="table table-hover"><thead><tr><th scope="col">Kategori</th><th scope="col">Sisa Persen Budget</th></tr></thead><tbody>';

    Object.keys(budget).forEach(kategori => {
        let sisaBudget = budget[kategori];
        let totalPengeluaran = daftarPengeluaran.filter(p => p.kategori === kategori).reduce((total, p) => total + p.nominal, 0);
        let sisaPersenBudget = ((sisaBudget - totalPengeluaran) / sisaBudget) * 100;
        tabelHTML += `<tr><td>${kategori}</td><td>${sisaPersenBudget.toFixed(2)}%</td></tr>`;
    });

    tabelHTML += '</tbody></table>';
    document.getElementById('tabelSisaBudget').innerHTML = tabelHTML;
}

    

    function hitungSisaUang() {
        let totalPemasukan = daftarPemasukan.reduce((total, pemasukan) => total + pemasukan.nominal, 0);
        let totalPengeluaran = daftarPengeluaran.reduce((total, pengeluaran) => total + pengeluaran.nominal, 0);
        let sisaUang = totalPemasukan - totalPengeluaran;

        let sisaUangHTML = `<h3 class ='mb-4'>Sisa Uang</h3>
                      <p class="fs-30 mb-2">Rp ${sisaUang}</p>`;
    document.getElementById('sisaUang').innerHTML = sisaUangHTML;

        if (sisaUang <= 0) {
            document.getElementById('sisaUang').style.color = 'red';
        } else {
            document.getElementById('sisaUang').style.color = 'White';
        }
    }

    tampilkanTabelPemasukan();
    tampilkanTabelPengeluaran();
    tampilkanTabelSisaBudget();
    hitungSisaUang();


    function inputBudget() {
    let kategori = document.getElementById('kategoriBudget').value;
    let nominal = parseFloat(document.getElementById('nominalBudget').value);

    if (kategori.trim() === '' || isNaN(nominal) || nominal <= 0) {
        alert('Mohon lengkapi semua kolom input budget dengan benar!');
        return;
    }

    budget[kategori] = nominal;

    document.getElementById('kategoriBudget').value = '';
    document.getElementById('nominalBudget').value = '';

    tampilkanTabelSisaBudget();
}

function hitungTotalPengeluaran() {
    let totalPengeluaran = daftarPengeluaran.reduce((total, pengeluaran) => total + pengeluaran.nominal, 0);
    let totalPengeluaranHTML = `<h3 class='mb-4'>Total Pengeluaran</h3><p class="fs-30 mb-2">Rp ${totalPengeluaran}</p>`;
    document.getElementById('totalPengeluaran').innerHTML = totalPengeluaranHTML;
}
tampilkanTabelPengeluaran();








