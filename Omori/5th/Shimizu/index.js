const titleMenu = document.getElementById('titleMenu');
const cantUse = document.getElementById('cantUse');

const howToDis = document.getElementById('howTo');
const howTo = document.getElementById('how-to');

const optionDis = document.getElementById('option');
const option = document.getElementById('option-button');

const exitBut = document.getElementById('exitButton');


howTo.addEventListener('click',function()
{
  cantUse.innerText = '現在ご利用いただけません'
  /*
  titleMenu.style.display = 'none';
  howToDis.style.display = 'block';*/
});

option.addEventListener('click',function()
{
  cantUse.innerText = '現在ご利用いただけません'
  /*
  titleMenu.style.display = 'none';
  optionDis.style.display = 'block';*/
});

exitBut.addEventListener('click',function()
{
  if (howToDis.style.display == 'block')
  {
    howToDis.style.display = 'none';
  }
  if (optionDis.style.display == 'block')
  {
    optionDis.style.display = 'none';
  }
  titleMenu.style.display = 'block';
});

titleMenu.style.display = 'block';