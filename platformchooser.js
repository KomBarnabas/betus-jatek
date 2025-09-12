function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPad Pro|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()){
    window.location.href = "mobile.html";
}else{
    window.location.href = "desktop.html";
}