async function LoadFooterdata(){
    let footerres=await fetch("./footer.html");
    let data=await footerres.text();
    document.getElementById("footer").innerHTML=data;
}
LoadFooterdata()