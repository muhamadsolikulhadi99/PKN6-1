let suaraBenar = new Audio("audio/benar.mp3");
let suaraSalah = new Audio("audio/salah.mp3");

let statusJawaban = []; // null = belum, true = benar, false = salah


function ucapkan(teks){
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    setTimeout(()=>{
        let u = new SpeechSynthesisUtterance(teks);
        u.lang = 'id-ID';
        u.rate = 0.9;
        speechSynthesis.speak(u);
    }, 300);
}

// Daftar soal PKn
const soalPKn = [
{t:"Pada awal pelajaran, seluruh siswa berdoa sesuai agama dan kepercayaannya masing-masing. Kegiatan tersebut sesuai dengan bunyi sila …",p:["Persatuan Indonesia","Ketuhanan Yang Maha Esa","Kemanusiaan yang adil dan beradab"],k:1},
{t:"Percaya dan bertakwa kepada Tuhan Yang Maha Esa merupakan nilai yang terkandung dalam sila …",p:["Kedua","Ketiga","Pertama"],k:2},
{t:"Sebelum belajar, guru mengajak siswa berdoa agar kegiatan berjalan lancar. Sikap ini merupakan contoh pengamalan sila pertama di …",p:["masyarakat","sekolah","negara"],k:1},
{t:"Edo tetap menghormati temannya yang berbeda agama saat beribadah. Sikap Edo mencerminkan nilai …",p:["Persatuan","Ketuhanan","Keadilan"],k:1},
{t:"Tidak mengejek keyakinan orang lain menunjukkan sikap …",p:["egois","toleransi","acuh"],k:1},
{t:"Setiap warga negara bebas menjalankan ibadah sesuai agamanya. Hal ini dijamin oleh Pancasila sila …",p:["Pertama","Kedua","Ketiga"],k:0},
{t:"Melaksanakan ibadah sesuai ajaran agama masing-masing mencerminkan sikap …",p:["tanggung jawab","ketuhanan","persatuan"],k:1},
{t:"Hidup rukun antarumat beragama di lingkungan sekolah merupakan pengamalan sila …",p:["Kelima","Keempat","Pertama"],k:2},
{t:"Menghormati perbedaan kepercayaan teman menunjukkan sikap …",p:["diskriminatif","toleran","individualis"],k:1},
{t:"Menjadikan ajaran agama sebagai pedoman dalam bersikap merupakan makna sila …",p:["Kedua","Ketiga","Pertama"],k:2},
{t:"Berdoa sebelum dan sesudah kegiatan bertujuan untuk …",p:["pamer","mengingat Tuhan","menunda kegiatan"],k:1},
{t:"Perilaku berikut yang tidak sesuai dengan sila pertama adalah …",p:["beribadah tepat waktu","menghormati agama lain","mengejek keyakinan teman"],k:2},
{t:"Contoh sikap toleransi beragama di sekolah adalah …",p:["memaksa teman beribadah","mengganggu ibadah teman","memberi kesempatan teman beribadah"],k:2},
{t:"Nilai utama yang terkandung dalam sila pertama adalah …",p:["kemanusiaan","ketuhanan","persatuan"],k:1},
{t:"Menghargai hari besar agama lain merupakan pengamalan sila …",p:["Pertama","Kedua","Ketiga"],k:0},
{t:"Ketuhanan Yang Maha Esa berarti …",p:["banyak Tuhan","tidak percaya Tuhan","percaya adanya satu Tuhan"],k:2},
{t:"Sikap saling menghormati antarumat beragama dapat menciptakan …",p:["perpecahan","permusuhan","kerukunan"],k:2},
{t:"Sila pertama mengajarkan manusia untuk bersikap …",p:["angkuh","taat dan toleran","acuh"],k:1},
{t:"Pengamalan sila pertama sebaiknya dilakukan dengan …",p:["paksaan","kekerasan","kesadaran"],k:2},
{t:"Perilaku yang mencerminkan sila pertama di sekolah adalah …",p:["membully","menyontek","berdoa"],k:2},
{t:"Guru memperlakukan semua siswa dengan adil tanpa membeda-bedakan. Hal ini menunjukkan bahwa manusia memiliki derajat yang …",p:["berbeda","tidak sama","sama"],k:2},
{t:"Rani membantu temannya yang terjatuh meskipun bukan sahabatnya. Sikap Rani menunjukkan …",p:["egois","empati","acuh"],k:1},
{t:"Tidak membully teman di sekolah merupakan pengamalan sila …",p:["Pertama","Kedua","Ketiga"],k:1},
{t:"Menolong teman yang mengalami kesulitan mencerminkan sikap …",p:["egois","empati","acuh"],k:1},
{t:"Bersikap sopan kepada guru dan teman adalah contoh pengamalan sila …",p:["Kedua","Ketiga","Keempat"],k:0},
{t:"Hak dan kewajiban harus dilaksanakan secara …",p:["terpisah","seimbang","sepihak"],k:1},
{t:"Menghargai pendapat teman saat diskusi mencerminkan sikap …",p:["memaksa","sombong","beradab"],k:2},
{t:"Bersikap adil berarti …",p:["memihak","sesuai aturan","pilih kasih"],k:1},
{t:"Perilaku yang bertentangan dengan sila kedua adalah …",p:["menolong teman","menghargai pendapat","membeda-bedakan teman"],k:2},
{t:"Nilai utama sila kedua adalah …",p:["persatuan","kemanusiaan","ketuhanan"],k:1},
{t:"Tenggang rasa berarti …",p:["acuh","saling menghormati","memaksa"],k:1},
{t:"Menghormati hak asasi setiap orang termasuk pengamalan sila …",p:["Pertama","Kedua","Ketiga"],k:1},
{t:"Tidak menggunakan kekerasan saat menyelesaikan masalah menunjukkan sikap …",p:["beradab","egois","pemarah"],k:0},
{t:"Bersikap adil kepada semua teman dapat menciptakan …",p:["perselisihan","kerukunan","permusuhan"],k:1},
{t:"Contoh perilaku kemanusiaan di kelas adalah …",p:["mengejek","menolong","mengganggu"],k:1},
{t:"Sila kedua mengajarkan manusia untuk …",p:["mementingkan diri sendiri","menghargai sesama manusia","memaksakan kehendak"],k:1},
{t:"Menghargai perbedaan pendapat mencerminkan sikap …",p:["egois","beradab","sombong"],k:1},
{t:"Perlakuan adil harus diberikan kepada …",p:["teman dekat","diri sendiri saja","semua orang"],k:2},
{t:"Saling tolong-menolong mencerminkan nilai …",p:["keadilan","kemanusiaan","ketuhanan"],k:1},
{t:"Perilaku beradab dapat ditunjukkan dengan sikap …",p:["berkata kasar","menghina","sopan santun"],k:2},
{t:"Siswa dari berbagai suku bekerja sama membersihkan kelas. Kegiatan ini mencerminkan sila …",p:["Persatuan Indonesia","Kemanusiaan","Ketuhanan"],k:0},
{t:"Mengikuti upacara bendera dengan tertib menunjukkan sikap …",p:["kemanusiaan","persatuan","keadilan"],k:1},
{t:"Rasa cinta tanah air merupakan nilai sila …",p:["Kedua","Ketiga","Keempat"],k:1},
{t:"Menghormati budaya daerah lain menunjukkan sikap …",p:["egois","persatuan","individualis"],k:1},
{t:"Bahasa yang digunakan sebagai pemersatu bangsa Indonesia adalah …",p:["bahasa daerah","bahasa asing","bahasa Indonesia"],k:2},
{t:"Bekerja sama tanpa membeda-bedakan teman mencerminkan sila …",p:["Kedua","Ketiga","Keempat"],k:1},
{t:"Sikap yang dapat merusak persatuan di sekolah adalah …",p:["gotong royong","toleransi","menyebar kebencian"],k:2},
{t:"Rela berkorban demi kepentingan bersama menunjukkan nilai …",p:["keadilan","persatuan","ketuhanan"],k:1},
{t:"Menghormati perbedaan suku dan budaya dapat memperkuat …",p:["perselisihan","persatuan","permusuhan"],k:1},
{t:"Gotong royong merupakan ciri khas bangsa Indonesia yang mencerminkan sila …",p:["Kedua","Ketiga","Keempat"],k:1},
{t:"Mengutamakan kepentingan bangsa di atas kepentingan pribadi menunjukkan nilai …",p:["kemanusiaan","persatuan","kerakyatan"],k:1},
{t:"Tidak menyebarkan berita bohong membantu menjaga …",p:["perpecahan","persatuan","kekacauan"],k:1},
{t:"Persatuan Indonesia harus dijaga dalam kondisi masyarakat yang …",p:["sama saja","seragam","beragam"],k:2},
{t:"Menghormati teman dari daerah lain menunjukkan sikap …",p:["diskriminatif","persatuan","acuh"],k:1},
{t:"Mengikuti kerja bakti di sekolah merupakan contoh …",p:["individualisme","gotong royong","persaingan"],k:1},
{t:"Persatuan akan terwujud jika warga saling …",p:["bermusuhan","menghargai","menghina"],k:1},
{t:"Sila ketiga mengajarkan kita untuk …",p:["memecah belah","bersatu","mementingkan diri"],k:1},
{t:"Contoh sikap cinta tanah air di sekolah adalah …",p:["merusak fasilitas","mencoret bendera","menjaga lingkungan"],k:2},
{t:"Persatuan bangsa Indonesia dilandasi oleh …",p:["kesamaan suku","kesamaan agama","keberagaman"],k:2},
{t:"Sikap yang mencerminkan sila ketiga adalah …",p:["berkelahi","saling menghormati","membeda-bedakan"],k:1},
{t:"Saat memilih ketua kelas, siswa berdiskusi untuk mencapai mufakat. Cara ini sesuai dengan sila …",p:["Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan","Persatuan Indonesia","Keadilan sosial"],k:0},
{t:"Mengambil keputusan bersama dilakukan melalui …",p:["voting sepihak","musyawarah","paksaan"],k:1},
{t:"Tidak memaksakan kehendak kepada orang lain merupakan nilai sila …",p:["Ketiga","Keempat","Kelima"],k:1},
{t:"Cara terbaik memilih ketua kelas adalah dengan …",p:["paksaan","musyawarah","kekerasan"],k:1},
{t:"Menerima hasil keputusan bersama dengan lapang dada menunjukkan sikap …",p:["bijaksana","egois","pemarah"],k:0},
{t:"Sila yang menekankan pentingnya keadilan bagi semua warga negara adalah sila …",p:["Persatuan Indonesia","Keadilan sosial bagi seluruh rakyat Indonesia","Ketuhanan Yang Maha Esa"],k:1},
{t:"Mengantre dengan tertib saat membeli makanan mencerminkan sila …",p:["Ketiga","Keempat","Kelima"],k:2},
{t:"Mengerjakan tugas tanpa menyontek menunjukkan sikap …",p:["jujur","curang","malas"],k:0},
{t:"Membagi tugas kelompok secara adil merupakan pengamalan sila …",p:["Keempat","Kelima","Ketiga"],k:1},
{t:"Menjalankan hak dan kewajiban secara seimbang mencerminkan nilai …",p:["keadilan","ketuhanan","persatuan"],k:0},
{t:"Pancasila sebagai dasar negara berarti …",p:["hiasan dinding","pedoman dalam membuat aturan","lagu nasional"],k:1},
{t:"Aturan di sekolah disusun berdasarkan nilai …",p:["kepentingan pribadi","Pancasila","keinginan siswa"],k:1},
{t:"Pancasila sebagai pandangan hidup bangsa berarti …",p:["pedoman bersikap sehari-hari","peraturan tertulis","hukuman"],k:0},
{t:"Menolong teman yang kesulitan merupakan pengamalan sila …",p:["Pertama","Kedua","Ketiga"],k:1},
{t:"Ideologi bangsa adalah …",p:["lagu daerah","cita-cita dan pedoman hidup bangsa","peraturan sekolah"],k:1},
{t:"Tujuan ideologi Pancasila adalah menciptakan masyarakat yang …",p:["kacau","adil dan makmur","egois"],k:1},
{t:"Kelima sila Pancasila bersifat …",p:["terpisah","berdiri sendiri","saling berkaitan"],k:2},
{t:"Jika satu sila tidak dijalankan, maka …",p:["tidak berpengaruh","sila lain ikut terpengaruh","lebih baik"],k:1},
{t:"Menolong teman yang kesusahan menunjukkan keterkaitan sila …",p:["Kedua dan Ketiga","Pertama dan Kelima","Keempat dan Kelima"],k:0},
{t:"Musyawarah memilih ketua kelas berkaitan dengan sila …",p:["Pertama dan Ketiga","Kedua dan Keempat","Ketiga dan Kelima"],k:1},
{t:"Bersikap adil saat bermain dapat membantu menjaga …",p:["perselisihan","persatuan","permusuhan"],k:1},
{t:"Berdoa sebelum belajar berkaitan dengan sila …",p:["Pertama","Kedua","Ketiga"],k:0},
{t:"Mengikuti upacara bendera mencerminkan sikap …",p:["keadilan","persatuan","kemanusiaan"],k:1},
{t:"Menghargai pendapat teman saat diskusi mencerminkan sila …",p:["Kedua dan Keempat","Pertama","Ketiga"],k:0},
{t:"Tidak mengambil hak orang lain merupakan pengamalan sila …",p:["Keempat","Kelima","Ketiga"],k:1},
{t:"Jumlah sila dalam Pancasila adalah …",p:["3","4","5"],k:2},
{t:"Kata “Panca” berarti …",p:["dasar","lima","prinsip"],k:1},
{t:"Nilai-nilai Pancasila harus diamalkan secara …",p:["terpisah","bersama-sama","sebagian"],k:1},
{t:"Contoh penerapan Pancasila di sekolah adalah …",p:["membolos","menyontek","taat aturan"],k:2},
{t:"Bersikap jujur merupakan pengamalan sila …",p:["Ketiga","Keempat","Kelima"],k:2},
{t:"Gotong royong merupakan nilai dari sila …",p:["Keadilan","Persatuan","Ketuhanan"],k:1},
{t:"Menghormati guru merupakan sikap …",p:["tidak sopan","beradab","egois"],k:1},
{t:"Mengutamakan kepentingan bersama menunjukkan nilai …",p:["kerakyatan","persatuan","kemanusiaan"],k:1},
{t:"Menyampaikan pendapat dengan sopan mencerminkan sila …",p:["Keempat","Kelima","Ketiga"],k:0},
{t:"Pancasila berlaku bagi …",p:["orang dewasa saja","pelajar saja","seluruh rakyat Indonesia"],k:2},
{t:"Nilai Pancasila sebaiknya diterapkan sejak usia …",p:["dewasa","kecil","lulus sekolah"],k:1},
{t:"Contoh keadilan di sekolah adalah …",p:["pilih kasih","memberi hukuman secara adil","membela teman"],k:1},
{t:"Bertanggung jawab terhadap tugas merupakan nilai sila …",p:["Kelima","Keempat","Kedua"],k:0},
{t:"Menjaga persatuan dapat dimulai dari lingkungan …",p:["sekolah","orang lain","pemerintah saja"],k:0},
{t:"Mengamalkan Pancasila berarti …",p:["menghafal saja","memahami dan melakukan dalam kehidupan sehari-hari","menulis ulang"],k:1}

];
// Fungsi acak soal agar total 100
function acakSoal(daftarSoal, total=100){
    let hasil=[];
    while(hasil.length<total){
        let s=daftarSoal[Math.floor(Math.random()*daftarSoal.length)];
        if(!hasil.includes(s)) hasil.push(s);
        if(hasil.length===daftarSoal.length) break;
    }
    while(hasil.length<total){
        hasil.push(daftarSoal[Math.floor(Math.random()*daftarSoal.length)]);
    }
    return hasil;
}

let soal=[]; // nanti berisi 100 soal acak
let totalSoal=100;
let i=0, benar=0, salah=0;
let waktuMulai, namaSiswa="";
let kotakSoal=[];

// ===== Mulai Kuis =====
document.getElementById("mulaiBtn").addEventListener("click", function(){
    const input = document.getElementById("namaSiswaInput");
    if(input.value.trim()===""){ 
        alert("Masukkan nama siswa!"); 
        return; 
    }
    namaSiswa = input.value.trim();
    document.getElementById("namaSertifikat").textContent = namaSiswa;

    const teksSambutan = `Assalamualaikum ${namaSiswa}! Mari Belajar PKn Bersama Pak Solihul. Tentang Makna, Keterkaitan sila dan Elemen Pancasila. Semoga belajar dengan semangat dan menyenangkan!..Aamiin`;
    
    document.getElementById("kataSambutan").textContent = teksSambutan;
    ucapkan(teksSambutan);

    document.getElementById("halaman1").style.display="none";
    document.getElementById("halaman2").style.display="flex";

    i = 0; benar = 0; salah = 0;
    waktuMulai = new Date();
    soal = acakSoal(soalPKn, totalSoal);
    statusJawaban = new Array(totalSoal).fill(null);


    buatProgressTracker();
    tampilSoal();
});

// ===== Tampil Soal =====
function tampilSoal(){
    document.getElementById("soal").textContent = `${i+1}. ${soal[i].t}`;
    const tombol = document.querySelectorAll("#pilihan button");

    tombol.forEach((btn,index)=>{
        btn.textContent = soal[i].p[index];
        btn.disabled = false;
        btn.classList.remove("blink-green","blink-red"); 
    });

    document.getElementById("feedback").textContent="";
    document.getElementById("infoSkor").textContent =
        `Soal: ${i+1} / ${totalSoal} | Benar: ${benar} | Salah: ${salah}`;

    updateProgress();
}

// ===== Cek Jawaban =====
function cekJawaban(btn){
    const semuaBtn = document.querySelectorAll("#pilihan button");
    semuaBtn.forEach(b => b.disabled = true);

    let jawabanAnak = btn.textContent;
    let jawabanBenar = soal[i].p[soal[i].k];
    if(statusJawaban[i] !== null) return; // cegah jawab ulang


    btn.classList.remove("blink-green","blink-red");

    if(jawabanAnak === jawabanBenar){
        benar++;
        statusJawaban[i] = true;
        if(suaraBenar) suaraBenar.play();
        document.getElementById("feedback").textContent="Benar! 🎉";
        document.getElementById("feedback").style.color="#00c853";
        void btn.offsetWidth;
        btn.classList.add("blink-green");
        updateProgressJawaban(i,true);
    }else{
        salah++;
        statusJawaban[i] = false;
        if(suaraSalah) suaraSalah.play();
        if(navigator.vibrate) navigator.vibrate(200);
        document.getElementById("feedback").textContent =
            `Salah 😢 Jawaban benar: ${jawabanBenar}`;
        document.getElementById("feedback").style.color = "#ffab00";
        void btn.offsetWidth;
        btn.classList.add("blink-red");

        document.querySelectorAll("#pilihan button").forEach(b=>{
            if(b.textContent === jawabanBenar){
                b.classList.add("blink-green");
            }
        });

        updateProgressJawaban(i,false);
    }

    document.getElementById("infoSkor").textContent =
        `Soal: ${i+1} / ${totalSoal} | Benar: ${benar} | Salah: ${salah}`;

    let next = statusJawaban.findIndex((v, idx) => v === null && idx > i);

    if(next !== -1){
        i = next;
        setTimeout(tampilSoal,1200);
    }else{
        setTimeout(selesaiUjian,1200);
    }
} // ← INI WAJIB (penutup cekJawaban)



// ===== Selesai Ujian =====
function selesaiUjian(){
    document.getElementById("halaman2").style.display="none";
    document.getElementById("halaman3").style.display="flex";

    let waktuSelesai = new Date();
    let durasiDetik = Math.floor((waktuSelesai - waktuMulai)/1000);
    let menit = Math.floor(durasiDetik/60);
    let detik = durasiDetik%60;
    let durasiText = `${menit} menit ${detik} detik`;

    let predikat;
    if(benar>=90) predikat="A (Sangat Baik)";
    else if(benar>=75) predikat="B (Baik)";
    else if(benar>=60) predikat="C (Cukup)";
    else predikat="D (Perlu Latihan)";

    document.getElementById("sertifBenar").textContent = benar;
    document.getElementById("sertifSalah").textContent = salah;
    document.getElementById("sertifSkor").textContent = `${benar} / ${totalSoal}`;
    document.getElementById("sertifPredikat").textContent = predikat;
    document.getElementById("durasiSertifikat").textContent = durasiText;
    document.getElementById("tanggalSertifikat").textContent = "Tanggal: " + waktuSelesai.toLocaleDateString('id-ID')+' '+waktuSelesai.toLocaleTimeString('id-ID');
}

// ===== Cetak Sertifikat =====
document.getElementById("cetakBtn").addEventListener("click",function(){
    this.style.display="none";
    window.print();
    this.style.display="inline-block";
});

// ===== Progress Tracker =====
function buatProgressTracker(){
    const progressDiv = document.getElementById("progress");
    progressDiv.innerHTML = "";
    kotakSoal = [];
    for(let idx=0; idx<soal.length; idx++){
        let box = document.createElement("div");
        box.className = "kotak-soal";
        box.textContent = idx + 1;
        box.addEventListener("click", ()=>gotoSoal(idx));
        progressDiv.appendChild(box);
        kotakSoal.push(box);
    }
}

function gotoSoal(idx){
    i = idx;
    tampilSoal();
}

function updateProgress(){
    kotakSoal.forEach((b,j)=>{
        b.classList.remove("saatIni");
        if(j===i) b.classList.add("saatIni");
    });
}

function updateProgressJawaban(idx, isBenar){
    const box = kotakSoal[idx];
    if(isBenar) box.classList.add("benar");
    else box.classList.add("salah");
}

// ===== Navigasi Next / Prev =====
document.getElementById("prevBtn").addEventListener("click", ()=>{
    if(i>0){ i--; tampilSoal(); }
});
document.getElementById("nextBtn").addEventListener("click", ()=>{
    if(i<soal.length-1){ i++; tampilSoal(); }
});
