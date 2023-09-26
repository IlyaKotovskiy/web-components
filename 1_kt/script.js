const contactTemplate = document.getElementById("contact-card");
const contactsContainer = document.getElementById("contacts-container");

function createContactCard(imageSrc, name, email, phone) {
  const contactCard = contactTemplate.content.cloneNode(true);

  contactCard.querySelector("img").src = imageSrc;
  contactCard.querySelector("h2").textContent = name;
  contactCard.querySelector("p:nth-of-type(1) span").textContent = email;
  contactCard.querySelector("p:nth-of-type(2) span").textContent = phone;

  return contactCard;
}

const contact1 = createContactCard("https://static.mk.ru/upload/entities/2022/02/19/13/articles/facebookPicture/a1/22/f9/fe/5806321f23443030b894c050f85998e1.jpg", "Андрей", "andrey@example.com", "123-456-789");
const contact2 = createContactCard("https://images.thevoicemag.ru/upload/img_cache/689/68920dfe74f9a184ea621d8b29b61346_ce_1080x716x0x0_cropped_1332x888.jpg", "Алексей", "alex@example.com", "987-654-321");

contactsContainer.appendChild(contact1);
contactsContainer.appendChild(contact2);