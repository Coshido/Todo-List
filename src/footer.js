export default function createFooter() {
  let footer = document.createElement("footer");
  let footerLink = document.createElement("a");
  footerLink.classList.add("footer-link");
  footerLink.href = "https://github.com/Coshido?tab=repositories";
  footerLink.target = "_blank";
  footerLink.innerHTML = `Copyrights © 2022 Coshido  <i class="fab fa-github"></i>`;
  footer.appendChild(footerLink);

  return footer;
}

/* 
footer {
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding: 10px;
}
.footer-link {
  text-decoration: none;
  color: white;
}
*/
