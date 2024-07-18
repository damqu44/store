import '../../../index.css'
import _ from 'lodash'

import Swiper from 'swiper/bundle'

import 'swiper/css/bundle'

import { handleSearch } from '../../search/handleSearch'
import { loadHeader } from '../../components/header'
import { loadFooter } from '../../components/footer'

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  spaceBetween: 30,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

document.addEventListener('DOMContentLoaded', () => {
  loadHeader()

  loadFooter()
  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', handleSearch)
})
