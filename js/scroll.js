var galleryTop = new Swiper('.gallery-top', {
	spaceBetween: 0,   //슬라이드 간격
  pagination: {   //페이징 사용자 설정
    el: ".pagination_bullet",   //페이징 태그 클래스 설정 
    clickable: true,    //버튼 클릭 여부
    type : 'bullets',   //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)   
    // Bullet Numbering 설정
    // renderBullet: function (index, className) {
    // 	return '<span class="' + className + '">' + (index + 1) + "</span>";
    // },
  },
});

//progress Bar
var fractionTop = new Swiper(".gallery-top", {
  pagination: {   //페이징 사용자 설정
    el: ".pagination_fraction",
    clickable: true,
    type: "fraction",
	}
});

var swiperjm = new Swiper(".gallery-top", {
  navigation: {
    nextEl: ".right",
    prevEl: ".left",
  },
});

// //Main Swiper로 progress Bar 제어
galleryTop.controller.control = fractionTop;


var interiorTop = new Swiper('.interior-top', {
	spaceBetween: "-30px",   //슬라이드 간격

});




(() => {
	const data = {
		headerRef: null,
		isScrolling: false,
		beforeST: 0,
		dir: null,
		mMenuToggleRef: null,
		mMenuDep1Refs: null,
		mFamilyMenuOpenRef: null,
		mFamilyMenuCloseRef: null,
		mFamilyMenuWrapRef: null,
		mFamilyMenuRefs: null,
	}
	const render = {
	};
	const service = {
	};
	const method = {
		isShowHeader(boolean){
			if(!data.isScrolling && boolean) {
				data.headerRef.classList.add('is_scroll')
				data.isScrolling = boolean;
			} else if(data.isScrolling && !boolean) {
				data.headerRef.classList.remove('is_scroll')
				data.isScrolling = boolean;
			}
		},
		isFamilyMenu(boolean, back){
			const isBack = back === undefined ? true : false;
			if(boolean) {
				data.mFamilyMenuOpenRef.setAttribute('aria-expanded', true)
				data.mFamilyMenuWrapRef.setAttribute('tabindex', 0)
				setTimeout(()=>{
					data.mFamilyMenuWrapRef.focus()
				}, 10)
			}
			else {
				data.mFamilyMenuOpenRef.setAttribute('aria-expanded', false)
				data.mFamilyMenuWrapRef.removeAttribute('tabindex')
				data.mFamilyMenuOpenRef.focus();
				setTimeout(()=>{
					data.mFamilyMenuOpenRef.focus()
				}, 10)
				if(isBack) history.back();
			}
		},
		isMobileMenu(boolean, back){
			const isBack = back === undefined ? true : false;
			if(boolean) {
				data.mMenuToggleRef.setAttribute('aria-expanded', true)
				data.mMenuToggleRef.querySelector('span').textContent = LANG == 'en' ? 'Close menu' : '메뉴 닫기'
			}
			else {
				data.mMenuToggleRef.setAttribute('aria-expanded', false)
				data.mMenuToggleRef.querySelector('span').textContent = LANG == 'en' ? 'Open menu' : '메뉴 열기'
				if(isBack) history.back();
			}
		},
	};
	const event = {
		setMenuBtn(){
			data.mMenuToggleRef.addEventListener('click', (e)=>{
				const curState = e.currentTarget.getAttribute('aria-expanded')
				if(curState == 'false') {
					method.isMobileMenu(true)
					freezeScroll(true)
				} else {
					method.isMobileMenu(false)
					freezeScroll(false)
				}
			})
		},
		setAccordionMenu(){
			data.mMenuDep1Refs.forEach(v => {
				v.addEventListener('click', (e)=>{
					v.blur();
					if(window.cmnData.ww > 1024 && !window.cmnData.isMob) return false;
					if(v.dataset.sub == 'false') return false;
					e.preventDefault();
					const curState = v.getAttribute('aria-expanded')
					data.mMenuDep1Refs.forEach(v1 => {
						const $btn = v1.querySelector('.btn')
						if(v != v1) {
							v1.setAttribute('aria-expanded', false)
							$btn.setAttribute('aria-label', LANG == 'ko' ? '하위 메뉴 열기' : 'Open sub menu')
						}
						else {
							if(curState == 'false') {
								v1.setAttribute('aria-expanded', true)
								$btn.setAttribute('aria-label', LANG == 'ko' ? '하위 메뉴 닫기' : 'Close sub menu')
							}
							else  {
								v1.setAttribute('aria-expanded', false)
								$btn.setAttribute('aria-label', LANG == 'ko' ? '하위 메뉴 열기' : 'Open sub menu')
							}
						};
					})
				})
			})
		},
		setToggleFamilyMenu(){
			data.mFamilyMenuOpenRef.addEventListener('click', function (){
				method.isFamilyMenu(true)
			})
			data.mFamilyMenuCloseRef.addEventListener('click', function (){
				method.isFamilyMenu(false)
			})
		},
		resetHash(){
			const url = window.location.href
			if(url.split('#')[1]) {
				window.location.replace(url.replace("#" + url.split('#')[1], ''));
			}
		}
	};
	const init = async () => {
		data.headerRef = document.getElementById('header');
		data.mMenuToggleRef = document.querySelector('.open_m_menu');
		data.mMenuDep1Refs = document.querySelectorAll('.main_menu .nav_link[data-sub]');
		data.mFamilyMenuOpenRef = document.querySelector('.open_m_familyMenu');
		data.mFamilyMenuWrapRef = document.getElementById('mFamilyMenu');
		data.mFamilyMenuCloseRef = data.mFamilyMenuWrapRef.querySelector('.close_modal');
		const st = window.pageYOffset;
		if(st > 0) method.isShowHeader(true);
		event.setMenuBtn()
		event.setAccordionMenu()
		event.setToggleFamilyMenu()
	};
	document.addEventListener("DOMContentLoaded", async () => {
		await init();
	});
	document.addEventListener("scroll", ()=>{
		const st = window.pageYOffset;
		const tempDir = data.beforeST > st ? 'up' : 'down'
		if(window.cmnData.htmlRef && data.dir != tempDir) {
			if(st + window.cmnData.wh > window.cmnData.htmlRef.scrollHeight - 100) {
				window.cmnData.htmlRef.classList.contains('up') ? window.cmnData.htmlRef.classList.replace('up', 'down') : '';
				return
			}
			data.dir = tempDir
			if (window.cmnData.htmlRef.classList.contains('up') || window.cmnData.htmlRef.classList.contains('down'))
				window.cmnData.htmlRef.classList.contains('up') ? window.cmnData.htmlRef.classList.replace('up', 'down') : window.cmnData.htmlRef.classList.replace('down', 'up');
			else window.cmnData.htmlRef.classList.add(data.dir)
		}
		if(st > 0) method.isShowHeader(true);
		else method.isShowHeader(false);
		data.beforeST = st
	})
	window.addEventListener('resize', ()=>{
		if(window.cmnData.ww > 1024) {
			event.resetHash()
		}
	})
	window.addEventListener("hashchange", function(e) {
		if(e.oldURL.indexOf('#mGNB') != -1 && e.newURL.indexOf('#FM') == -1) {
			method.isMobileMenu(false, false)
		}
		else if(e.oldURL.indexOf('#mGNB') != -1 && e.newURL.indexOf('#FM') != -1  ) {
			method.isFamilyMenu(true)
		}
		else if(e.oldURL.indexOf('#FM') == -1 && e.newURL.indexOf('#mGNB') != -1) {
			method.isMobileMenu(true)
		}
		else if(e.oldURL.indexOf('#FM') != -1 && e.newURL.indexOf('#mGNB') != -1) {
			method.isFamilyMenu(false, false)
			method.isMobileMenu(true)
		}
	});
})();



const openOutLink = (link, e) => {
  if (e && e.keyCode != 13) return
  window.open(link);
}
const changeLangs = (lang) => {
  if (lang == LANG) return;
  window.location.pathname = window.location.pathname.replace(LANG, lang);
}
const changeLangsByKey = () => {
  if(event.keyCode == 13) changeLangs(event.currentTarget.dataset.lang)
}
window.cmnData = {
  htmlRef: null,
  frzST: 0,
  popupRef: null,
  isMob: false,
  wh: 0,
  ww: 0,
  curModalTarget: null
}
const closePopup = ($this, el) => {
  const $hideDay = document.getElementById('hideDay');
  if ($hideDay && $hideDay.checked) {
    document.cookie = "popup=true; max-age=86400; path=/;";
  }
  const modal = $this.closest('.modal')
  modal.parentElement.classList.remove('is_show');
  modal.removeAttribute('tabindex');
  if(modal.id == 'popup') popupTabFlowHandler(false)
  freezeScroll(false);
  if (el) {
    const $el = document.getElementById(el);
    $el.setAttribute('aria-expanded', false);
    $el.focus();
  }
}

const freezeScroll = (boolean) => {
  if (boolean) {
    window.cmnData.frzST = window.pageYOffset
    window.cmnData.htmlRef.classList.add('frz_scroll');
    if (window.cmnData.frzST == 0) window.cmnData.htmlRef.classList.add('is_zero');
    window.cmnData.htmlRef.setAttribute('style', '--frz_st:' + window.cmnData.frzST)
  } else {
    window.cmnData.htmlRef.classList.remove('frz_scroll')
    window.scrollTo(0, window.cmnData.frzST)
    window.cmnData.frzST = null;
  }
}
const setWinInfo = () => {
  window.cmnData.ww = window.innerWidth > 1920 ? 1920 : window.innerWidth;
  window.cmnData.wh = window.innerHeight > 1080 ? window.cmnData.ww < 1024 ? window.innerHeight : 1080 : window.innerHeight;
  document.body.setAttribute('style', '--winH: ' + window.cmnData.wh + '; --winW: ' + window.cmnData.ww + ';')
}
const openEmailPopup = ($this) => {
  $this.setAttribute('aria-expanded', true)
  const modal = document.querySelector("#email_policy");
  modal.parentElement.classList.add("is_show");
  modal.setAttribute('tabindex', 0)
  window.cmnData.curModalTarget = $this
  freezeScroll(true);
  setTimeout(()=> {
    modal.focus();
  }, 10)
}
const setTabFlow = (e, group, idx)=>{
  if (e.shiftKey && e.keyCode == 9 && idx == 0) {
    e.preventDefault()
    group[group.length - 1].focus()
  } else if (!e.shiftKey && e.keyCode == 9 && idx == group.length - 1) {
    e.preventDefault()
    group[0].focus()
  }
}
let firstTab = true
const popupTabFlowHandler = (Boolean)=> {
  const popupTabs = window.cmnData.popupRef.querySelectorAll('a , input, button')
  popupTabs.forEach((v, i) => {
    if(Boolean) {
      v.addEventListener('keydown', (e) => setTabFlow(e, popupTabs, i))
    } else {
      v.removeEventListener('keydown', setTabFlow)
    }
  })
  if(Boolean) {
    function setTapPos(e){
      if(!firstTab) return
      if(e.keyCode == 9) {
        e.preventDefault()
        if(e.shiftKey) popupTabs[popupTabs.length - 1].focus();
        else popupTabs[0].focus();
        firstTab = false;
      }
    }
    document.addEventListener('keydown', e => setTapPos(e))
  }
  else {
    document.body.setAttribute('tabindex', 0)
    document.body.focus()
    setTimeout(()=>{
      document.body.removeAttribute('tabindex')
    }, 1)
  }
}
(() => {
  const setDropdownUi = () => {
    const $dropdownEls = document.querySelectorAll('[data-drop="true"]');
    const dropdown = Array.from($dropdownEls).map(v => ({
      $el: v,
      first: true
    }))
    let first = true;
    const openDropdown = (e) => {
      const $this = e.currentTarget ? e.currentTarget : e.target
      const $dropdownItems = Array.from($this.nextElementSibling.children);
      const type = $this.dataset.type
      if ($this.getAttribute('aria-expanded') === 'true') {
        offDropdown(e)
        return
      }
      $this.setAttribute('aria-expanded', true);
      for (let $v of dropdown) {
        if ($v.$el == $this && !$v.first) return
      }
      setSelectDropdown($dropdownItems, e, type)
      for (let $v of dropdown) {
        if ($v.$el == $this) $v.first = true
      }
    };
    const offDropdown = (e) => {
      const $this = e.currentTarget ? e.currentTarget : e.target
      $this.setAttribute('aria-expanded', false);
      $this.focus();
    };
    const setValue = ($item, $target, type) => {
      const value = $item.dataset.value ? $item.dataset.value : $item.textContent
      const id = $item.id
      const list = Array.from($target.nextElementSibling.children);
      if (type !== 'dropMenu') $target.querySelector('span').textContent = value;
      $target.setAttribute('aria-activedescendant', id)
      list.forEach($item1 => {
        if ($item1 != $item) $item1.setAttribute('aria-selected', false);
        else {
          $item1.setAttribute('aria-selected', true);
        }
      })
    }

    function moveOption(idx, $target) {
      const list = Array.from($target.nextElementSibling.children);
      if (idx < 0 || idx > list.length - 1) {
        $target.focus()
        return
      }
      list[idx].focus()
    }

    const setSelectDropdown = (list, targetEvt, type) => {
      list.forEach(($item, idx) => {
        $item.addEventListener('click', () => {
          setValue($item, targetEvt.target, type)
          offDropdown(targetEvt)
        })
        $item.addEventListener('keydown', (e) => {
          const code = e.keyCode
          if (code == 38 || code == 40 || code == 13 || code == 27) {
            e.preventDefault()
            // up
            if (code == 38) moveOption(idx - 1, targetEvt.target)
            // down
            if (code == 40) moveOption(idx + 1, targetEvt.target)
            // enter
            if (code == 13) {
              setValue($item, targetEvt.target, type)
              offDropdown(targetEvt)
            }
            // esc
            if (code == 27) offDropdown(targetEvt)
          }
          if (!e.shiftKey && code == 9 && idx == list.length - 1) {
            e.preventDefault()
            offDropdown(targetEvt)
          }
        })
      })
    }
    $dropdownEls.forEach($el => {
      $el.addEventListener('click', (e) => {
        e.preventDefault();
        openDropdown(e);
      });
      $el.addEventListener('keydown', (e) => {
        const code = e.keyCode
        if (code == 38 || code == 40 || code == 13 || code == 27) {
          const $this = e.currentTarget;
          const list = Array.from($this.nextElementSibling.children);
          e.preventDefault()
          if (code == 38) {
            // up
            if ($this.getAttribute('aria-expanded') === 'true')
              moveOption(list.length - 1, $this)
          }
          if (code == 40) {
            // down
            if ($this.getAttribute('aria-expanded') === 'true')
              moveOption(0, $this)
          }
          if (code == 13) {
            // enter
            openDropdown(e);
          }
          //esc
          if (code == 27)
            offDropdown(e)
        }
      })
    });
  }

  function WebpIsSupported(callback) {
    // If the browser doesn't has the method createImageBitmap, you can't display webp format
    if (!window.createImageBitmap) {
      callback(false);
      return;
    }
    // Base64 representation of a white point image
    var webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
    // Retrieve the Image in Blob Format
    fetch(webpdata).then(function (response) {
      return response.blob();
    }).then(function (blob) {
      // If the createImageBitmap method succeeds, return true, otherwise false
      createImageBitmap(blob).then(function () {
        callback(true);
      }, function () {
        callback(false);
      });
    });
  }

  let movePoint = [];
  let pointRetina = window.innerHeight * .8
  const setMovePoint = () => {
    movePoint = [];
    const $move_el = document.querySelectorAll('.move_point')
    const st = window.pageYOffset
    $move_el.forEach(v => {
      movePoint.push({
        el: v,
        point: v.getBoundingClientRect().top + st,
        state: false,
      })
    })
  }
  const animateTrigger = (st) => {
    for (let i = movePoint.length; i > 0; i--) {
      if (movePoint[i - 1].state) continue;
      if (movePoint[i - 1].point < st + pointRetina) {
        movePoint[i - 1].el.classList.add('on_move')
        movePoint[i - 1].state = true
      }
    }
  }
  const checkDevice = () => {
    // console.log(agent, agent.indexOf('windows'))
    if (agent.indexOf('iphone') != -1 || agent.indexOf('ipad') != -1 || agent.indexOf('mac') != -1) return 'iOS'
    else if (agent.indexOf('windows') !== -1) return 'window';
    else return 'android'
  }
  const isMobile = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };


  document.addEventListener('DOMContentLoaded', () => {
    window.cmnData.htmlRef = document.documentElement
    window.cmnData.popupRef = document.getElementById('popup');
    const st = window.pageYOffset
    setWinInfo();
    setDropdownUi();
    setMovePoint()
    animateTrigger(st);
    if (checkDevice) {
      window.cmnData.htmlRef.classList.add('dv_' + checkDevice())
    }
    window.cmnData.isMob = isMobile() ? true : false;
    if (window.cmnData.popupRef) {
      freezeScroll(true)
      popupTabFlowHandler(true)
    }
  })
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset
    animateTrigger(st)
  })
  window.addEventListener('resize', ()=> {
    if(window.cmnData.ww != window.innerWidth) setWinInfo()
    const st = window.pageYOffset
    setMovePoint()
    animateTrigger(st);
  })
  window.onload = () => {
    WebpIsSupported((isSupportWebP) => {
      if (!isSupportWebP) {
        document.body.classList.remove('support-webp');
        const mv = document.querySelector('video')
        if(mv) {
          const poster = mv.poster.split('.')
          const posterPath = `${poster[0].replace('/webp', '')}.png`
          mv.setAttribute('poster', posterPath)
        }
      }
    });
  }
})()