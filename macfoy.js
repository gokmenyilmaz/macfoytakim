const secili_mac_kodu = 120;

let takimA = "";
let takimB = "";

let takimA_oyunculari = [];
let takimB_oyunculari = [];

let macFoyNesne = [];

var btnGonder = document.getElementById("gonder");

let url = new URL(window.location.href)
let params = new URLSearchParams(url.search);


window.onload = async function()
{

  let lig = params.get('lig') ;
  let mac_kodu = params.get('mac_kodu') ;
  await fiksturGetir(lig,mac_kodu);
 
}




btnGonder.addEventListener("click", async (e) => {

  var form = new FormData(document.querySelector("form"));
  const data = Object.fromEntries(form.entries());
  let macFoyNesne_json = JSON.stringify(data);
  let sonucText= await FiksturKaydetPostApi(macFoyNesne_json);

  alert(sonucText);

});

async function FiksturKaydetPostApi(macFoyNesne_json) {
  let postHeader = {
    method: "POST",
    body: macFoyNesne_json,
  };

  let basePath="https://masatenisi06.com/kurumlar/admin/fikstur";

  let sonuc = await fetch(
    basePath + "/FiksturKaydetApi.php", postHeader
  );

  return sonuc.text();
}



window.addEventListener("load", (event) => {
  var t1 = document.getElementById("t1");
  var t2 = document.getElementById("t2");

  console.log("form yuklendi");

  t1.innerHTML = takimA;
  t2.innerHTML = takimB;

  let acilirKutular = [...document.getElementsByTagName("select")];

  acilirKutular.map((c) =>
    c.addEventListener("change", (e) => {
      console.log("degisti", e.target);

      if (e.target.name == "mac1_oyuncu1")
        document.getElementsByName("mac5_oyuncu1")[0].value = e.target.value;

      if (e.target.name == "mac2_oyuncu1")
        document.getElementsByName("mac7_oyuncu1")[0].value = e.target.value;

      if (e.target.name == "mac3_oyuncu1")
        document.getElementsByName("mac6_oyuncu1")[0].value = e.target.value;

      if (e.target.name == "mac1_oyuncu2")
        document.getElementsByName("mac6_oyuncu2")[0].value = e.target.value;

      if (e.target.name == "mac2_oyuncu2")
        document.getElementsByName("mac5_oyuncu2")[0].value = e.target.value;

      if (e.target.name == "mac3_oyuncu2")
        document.getElementsByName("mac7_oyuncu2")[0].value = e.target.value;
    })
  );


  let skor_inputs = [...document.getElementsByClassName("set-skor-text")];

  document.getElementsByName("MacFoySonuc")[0].value = "0-0";

  skor_inputs.map((c) => {
    c.addEventListener("input", (e) => {
      skorHesapla(e.target);
    });
  });
});

function skorHesapla(el) {
  let mac_sira_no = el.name.substring(0, 4);

  var formData = new FormData(document.querySelector("form"));

  const dizi = Object.fromEntries(formData.entries());

  let set1 = dizi[mac_sira_no + "_set1"];
  let set2 = dizi[mac_sira_no + "_set2"];
  let set3 = dizi[mac_sira_no + "_set3"];
  let set4 = dizi[mac_sira_no + "_set4"];
  let set5 = dizi[mac_sira_no + "_set5"];

  let mac_sonuc = macSonucuGetir(set1, set2, set3, set4, set5);

  document.getElementsByName(mac_sira_no + "_skor")[0].value = mac_sonuc;

  genelMacSonucuHesapla();
}

function genelMacSonucuHesapla() {
  var formData = new FormData(document.querySelector("form"));

  const dizi = Object.fromEntries(formData.entries());

  let takim1_macSkor = 0;
  let takim2_macSkor = 0;

  let mac1_skor = dizi["mac1_skor"];
  let mac2_skor = dizi["mac2_skor"];
  let mac3_skor = dizi["mac3_skor"];
  let mac4_skor = dizi["mac4_skor"];
  let mac5_skor = dizi["mac5_skor"];
  let mac6_skor = dizi["mac6_skor"];
  let mac7_skor = dizi["mac7_skor"];

  if (mac_sonuc_kazanan_getir(mac1_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac1_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac2_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac2_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac3_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac3_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac4_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac4_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac5_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac5_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac6_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac6_skor) == 2) takim2_macSkor += 1;

  if (mac_sonuc_kazanan_getir(mac7_skor) == 1) takim1_macSkor += 1;
  if (mac_sonuc_kazanan_getir(mac7_skor) == 2) takim2_macSkor += 1;

  document.getElementsByName("MacFoySonuc")[0].value =
    takim1_macSkor + "-" + takim2_macSkor;
}

function mac_sonuc_kazanan_getir(satir_sonuc) {
  let ilkTakimSkor = parseInt(satir_sonuc.split("-")[0]);
  let ikinciTakimSkor = parseInt(satir_sonuc.split("-")[1]);

  if (
    ilkTakimSkor > ikinciTakimSkor &&
    Math.max(ilkTakimSkor, ikinciTakimSkor) === 3
  ) {
    return 1;
  }

  if (
    ikinciTakimSkor > ilkTakimSkor &&
    Math.max(ilkTakimSkor, ikinciTakimSkor) === 3
  ) {
    return 2;
  }

  return 0;
}

function macSonucuGetir(set1, set2, set3, set4, set5) {
  let oyuncu1_kazanılan_set_sayısı = 0;
  let oyuncu2_kazanılan_set_sayısı = 0;

  if (set1.length >= 4 && set1.includes("-")) {
    let kazanan = setKazananGetir(set1);

    if (kazanan == 1) oyuncu1_kazanılan_set_sayısı++;
    if (kazanan == 2) oyuncu2_kazanılan_set_sayısı++;
  }

  if (set2.length >= 4 && set2.includes("-")) {
    let kazanan = setKazananGetir(set2);

    if (kazanan == 1) oyuncu1_kazanılan_set_sayısı++;
    if (kazanan == 2) oyuncu2_kazanılan_set_sayısı++;
  }

  if (set3.length >= 4 && set3.includes("-")) {
    let kazanan = setKazananGetir(set3);

    if (kazanan == 1) oyuncu1_kazanılan_set_sayısı++;
    if (kazanan == 2) oyuncu2_kazanılan_set_sayısı++;
  }

  if (set4.length >= 4 && set4.includes("-")) {
    let kazanan = setKazananGetir(set4);

    if (kazanan == 1) oyuncu1_kazanılan_set_sayısı++;
    if (kazanan == 2) oyuncu2_kazanılan_set_sayısı++;
  }

  if (set5.length >= 4 && set5.includes("-")) {
    let kazanan = setKazananGetir(set5);

    if (kazanan == 1) oyuncu1_kazanılan_set_sayısı++;
    if (kazanan == 2) oyuncu2_kazanılan_set_sayısı++;
  }

  return oyuncu1_kazanılan_set_sayısı + "-" + oyuncu2_kazanılan_set_sayısı;
}

function setKazananGetir(set) {
  set_a = parseInt(set.split("-")[0]);
  set_b = parseInt(set.split("-")[1]);

  if (Math.abs(set_a - set_b) >= 2 && (set_a >= 11 || set_b >= 11)) {
    let kazanan = set_a > set_b ? 1 : 2;
    return kazanan;
  }

  return 0;
}

function kutularaOyuncuIsimleriniDoldur() {
  let cbo_mac1_oyuncu1 = document.getElementsByName("mac1_oyuncu1")[0];
  let cbo_mac1_oyuncu2 = document.getElementsByName("mac1_oyuncu2")[0];

  let cbo_mac2_oyuncu1 = document.getElementsByName("mac2_oyuncu1")[0];
  let cbo_mac2_oyuncu2 = document.getElementsByName("mac2_oyuncu2")[0];

  let cbo_mac3_oyuncu1 = document.getElementsByName("mac3_oyuncu1")[0];
  let cbo_mac3_oyuncu2 = document.getElementsByName("mac3_oyuncu2")[0];

  let cbo_mac4_oyuncu_1_1 = document.getElementsByName("mac4_oyuncu_1_1")[0];
  let cbo_mac4_oyuncu_1_2 = document.getElementsByName("mac4_oyuncu_1_2")[0];
  let cbo_mac4_oyuncu_2_1 = document.getElementsByName("mac4_oyuncu_2_1")[0];
  let cbo_mac4_oyuncu_2_2 = document.getElementsByName("mac4_oyuncu_2_2")[0];

  takim1_optionText = "";
  takim2_optionText = "";

  takimA_oyunculari.forEach((c) => {
    takim1_optionText += `<Option>${c}</Option>`;
  });

  takimB_oyunculari.forEach((c) => {
    takim2_optionText += `<Option>${c}</Option>`;
  });

  cbo_mac1_oyuncu1.innerHTML = `<Option>Seçiniz</Option>` + takim1_optionText;
  cbo_mac1_oyuncu2.innerHTML = `<Option>Seçiniz</Option>` + takim2_optionText;

  cbo_mac2_oyuncu1.innerHTML = `<Option>Seçiniz</Option>` + takim1_optionText;
  cbo_mac2_oyuncu2.innerHTML = `<Option>Seçiniz</Option>` + takim2_optionText;

  cbo_mac3_oyuncu1.innerHTML = `<Option>Seçiniz</Option>` + takim1_optionText;
  cbo_mac3_oyuncu2.innerHTML = `<Option>Seçiniz</Option>` + takim2_optionText;

  cbo_mac4_oyuncu_1_1.innerHTML = `<Option>Seçiniz</Option>` + takim1_optionText;
  cbo_mac4_oyuncu_1_2.innerHTML = `<Option>Seçiniz</Option>` + takim1_optionText;
  cbo_mac4_oyuncu_2_1.innerHTML = `<Option>Seçiniz</Option>` + takim2_optionText;
  cbo_mac4_oyuncu_2_2.innerHTML = `<Option>Seçiniz</Option>` + takim2_optionText;


  document.getElementsByName("mac5_oyuncu1")[0].value="";
  document.getElementsByName("mac5_oyuncu2")[0].value="";

  document.getElementsByName("mac6_oyuncu1")[0].value="";
  document.getElementsByName("mac6_oyuncu2")[0].value="";

  document.getElementsByName("mac7_oyuncu1")[0].value="";
  document.getElementsByName("mac7_oyuncu2")[0].value="";

 
}



async function FiksturGetirFromApi(lig,mac_kodu) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let sonuc = await fetch(
    `https://masatenisi06.com/kurumlar/admin/fikstur/FiksturGetirApi.php?fx_ligi=${lig}&fx_mac_no=${mac_kodu}`,
    requestOptions
  );

  return sonuc.json();
}

async function oyunculariGetir(kulupAd) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let sonuc = await fetch(
    `https://masatenisi06.com/kurumlar/admin/fikstur/OyuncuGetirApi.php?kulupAd=${kulupAd}`,
    requestOptions
  );

  return sonuc.json();
}



async function FiksturMacFoyGetir(lig,mac_kodu) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let sonuc = await fetch(
    `https://masatenisi06.com/kurumlar/admin/fikstur/FiksturMacFoyGetirApi.php?lig=${lig}&mac_kodu=${mac_kodu}`,
    requestOptions
  );

  return sonuc.json();
}


 async function fiksturGetir(lig,mac_kodu) {

  MacFoyuTemizle();

  if(!lig || !mac_kodu)
  {
    lig = document.getElementsByName("lig")[0].value;
    mac_kodu = document.getElementsByName("mac_kodu")[0].value;
  }

  let fiksturData = await  FiksturGetirFromApi(lig,mac_kodu);

  document.getElementsByName("mac_kodu")[0].value=mac_kodu;
  document.getElementsByName("lig")[0].value=lig;


  window.history.replaceState(null, null, `?lig=${lig}&mac_kodu=${mac_kodu}`);

  document.getElementById("t1").innerHTML = fiksturData[0].fx_tk1;
  document.getElementById("t1").innerHTML = fiksturData[0].fx_tk2;

  takimA = fiksturData[0].fx_tk1;
  takimB = fiksturData[0].fx_tk2;


  let a = await  oyunculariGetir(takimA);
  let b = await oyunculariGetir(takimB);
  let macFoy=await FiksturMacFoyGetir(lig,mac_kodu);

  takimA_oyunculari = a.map(c=>c.adsoyad)
  takimB_oyunculari = b.map(c=>c.adsoyad)



  kutularaOyuncuIsimleriniDoldur();
  macFoyuDoldur(macFoy);
   
  
}


function macFoyuDoldur(macFoy)
{
  let data=macFoy[0];
  for (let i = 1; i <=7; i++) {
    if(i!=4)
    {
      document.getElementsByName(`mac${i}_oyuncu1`)[0].value= data[`mac${i}_oyuncu1`];
      document.getElementsByName(`mac${i}_oyuncu2`)[0].value= data[`mac${i}_oyuncu2`];
    }
    else
    {
      document.getElementsByName(`mac${i}_oyuncu_1_1`)[0].value= data[`mac${i}_oyuncu_1_1`];
      document.getElementsByName(`mac${i}_oyuncu_1_2`)[0].value= data[`mac${i}_oyuncu_1_2`];
      document.getElementsByName(`mac${i}_oyuncu_2_1`)[0].value= data[`mac${i}_oyuncu_2_1`];
      document.getElementsByName(`mac${i}_oyuncu_2_2`)[0].value= data[`mac${i}_oyuncu_2_2`];

    }


    for (let j = 1; j <= 5; j++) {
      let mac_set_field_name=`mac${i}_set${j}`;
      document.getElementsByName(mac_set_field_name)[0].value=data[mac_set_field_name];
    }

    document.getElementsByName(`mac${i}_skor`)[0].value=data[`mac${i}_skor`];
  }

  document.getElementsByName("MacFoySonuc")[0].value= data["MacFoySonuc"];

}


function MacFoyuTemizle()
{
  for (let i = 1; i <=7; i++) {
    if(i!=4)
    {
      document.getElementsByName(`mac${i}_oyuncu1`)[0].value= "";
      document.getElementsByName(`mac${i}_oyuncu2`)[0].value= "";
    }
    else
    {
      document.getElementsByName(`mac${i}_oyuncu_1_1`)[0].value= "";
      document.getElementsByName(`mac${i}_oyuncu_1_2`)[0].value=  "";
      document.getElementsByName(`mac${i}_oyuncu_2_1`)[0].value=  "";
      document.getElementsByName(`mac${i}_oyuncu_2_2`)[0].value=  "";

    }


    for (let j = 1; j <= 5; j++) {
      let mac_set_field_name=`mac${i}_set${j}`;
      document.getElementsByName(mac_set_field_name)[0].value="";
    }

    document.getElementsByName(`mac${i}_skor`)[0].value="";
  }

  document.getElementsByName("MacFoySonuc")[0].value= "";

}