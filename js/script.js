/*! Elastic Slider (c) 2014 // Taron Mehrabyan // Ruben Sargsyan
 */
var $j = jQuery.noConflict();
window.addEventListener('load', onWndLoad, false);

function onWndLoad() {

    var slider = document.querySelector('.slider');
    var sliders = slider.children;




    var initX = null;
    var transX = 0;
    var rotZ = 0;
    var transY = 0;

    var curSlide = null;

    var Z_DIS = 50;
    var Y_DIS = 10;
    var TRANS_DUR = 0.4;

    var images = document.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
        images[i].onmousemove = function(e) {
            e.preventDefault()

        }
        images[i].ondragstart = function(e) {
            return false;

        }
    }

    function init() {

        var z = 0,
            y = 0;

        for (var i = sliders.length - 1; i >= 0; i--) {
            sliders[i].style.transform = 'translateZ(' + z + 'px) translateY(' + y + 'px)';

            z -= Z_DIS;
            y += Y_DIS;
        }


        attachEvents(sliders[sliders.length - 1]);



    }

    function attachEvents(elem) {
        curSlide = elem;

        curSlide.addEventListener('mousedown', slideMouseDown, false);
        curSlide.addEventListener('touchstart', slideMouseDown, false);
    }
    init();

    function slideMouseDown(e) {

        if (e.touches) {
            initX = e.touches[0].clientX;
        } else {
            initX = e.pageX;
        }


        document.addEventListener('mousemove', slideMouseMove, false);
        document.addEventListener('touchmove', slideMouseMove, false);

        document.addEventListener('mouseup', slideMouseUp, false);
        document.addEventListener('touchend', slideMouseUp, false);
    }
    var prevSlide = null;

    function slideMouseMove(e) {
        var mouseX;

        if (e.touches) {
            mouseX = e.touches[0].clientX;
        } else {
            mouseX = e.pageX;
        }

        transX += mouseX - initX;
        rotZ = transX / 20;

        transY = -Math.abs(transX / 15);



        curSlide.style.transition = 'none';
        curSlide.style.webkitTransform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide.style.transform = 'translateX(' + transX + 'px)' + ' rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        var j = 1;
        //remains elements
        for (var i = sliders.length - 2; i >= 0; i--) {

            sliders[i].style.webkitTransform = 'translateX(' + transX / (2 * j) + 'px)' + ' rotateZ(' + rotZ / (2 * j) + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transform = 'translateX(' + transX / (2 * j) + 'px)' + ' rotateZ(' + rotZ / (2 * j) + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transition = 'none';
            j++;
        }



        initX = mouseX;
        e.preventDefault();
        if (Math.abs(transX) >= curSlide.offsetWidth - 30) {

            document.removeEventListener('mousemove', slideMouseMove, false);
            document.removeEventListener('touchmove', slideMouseMove, false);
            curSlide.style.transition = 'ease 0.2s';
            curSlide.style.opacity = 0;
            prevSlide = curSlide;
            attachEvents(sliders[sliders.length - 2]);
            slideMouseUp();
            setTimeout(function() {





                slider.insertBefore(prevSlide, slider.firstChild);

                prevSlide.style.transition = 'none';
                prevSlide.style.opacity = '1';
                slideMouseUp();

            }, 201);



            return;
        }
    }

    function slideMouseUp() {
        transX = 0;
        rotZ = 0;
        transY = 0;

        curSlide.style.transition = 'cubic-bezier(0,1.95,.49,.73) ' + TRANS_DUR + 's';

        curSlide.style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        curSlide.style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + transY + 'px)';
        //remains elements
        var j = 1;
        for (var i = sliders.length - 2; i >= 0; i--) {
            sliders[i].style.transition = 'cubic-bezier(0,1.95,.49,.73) ' + TRANS_DUR / (j + 0.9) + 's';
            sliders[i].style.webkitTransform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';
            sliders[i].style.transform = 'translateX(' + transX + 'px)' + 'rotateZ(' + rotZ + 'deg)' + ' translateY(' + (Y_DIS * j) + 'px)' + ' translateZ(' + (-Z_DIS * j) + 'px)';

            j++;
        }

        document.removeEventListener('mousemove', slideMouseMove, false);
        document.removeEventListener('touchmove', slideMouseMove, false);

    }


}

//Scrolling wrapper
$j(function() {
    var offset = $(".navbar-wrapper").offset();
    var topPadding = 200;
    $j(window).scroll(function() {
        if ($j(window).scrollTop() > offset.top) {
            $j(".navbar-wrapper").stop().animate({
                marginTop: $j(window).scrollTop() - offset.top + topPadding
            });
        } else {
            $j(".navbar-wrapper").stop().animate({
                marginTop: 0
            });
        };
    });
});
//isScrolledIntoView
$j(function() {
    function isScrolledIntoView($elem) {
        var docViewTop = $j(window).scrollTop();
        var docViewBottom = docViewTop + $j(window).height();
        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    function count($this) {
        var current = parseInt($this.html(), 10);
        if (isScrolledIntoView($this) && !$this.data("isCounting") && current < $this.data('count')) {
            $this.html(++current);
            $this.data("isCounting", true);
            setTimeout(function() {
                console.log('y');
                $this.data("isCounting", false);
                count($this);
            }, 20);
        }
    }

    $j(".c-section1").each(function() {
        $j(this).data('count', parseInt($j(this).html(), 10));
        $j(this).html('0');
        $j(this).data("isCounting", false);
    });

    function paintProfile() {
        $j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_profile').addClass("background-color-changed");
    }

    function paintExperiences() {
        $j('#navbar_square_profile').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_experiences').addClass("background-color-changed");
    }

    function paintProject() {
        $j('#navbar_square_profile').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').addClass("background-color-changed");
    }

    function paintAbilities() {
        $j('#navbar_square_profile').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').addClass("background-color-changed");
    }

    function paintReview() {
        $j('#navbar_square_profile').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').addClass("background-color-changed");
    }

    function paintContact() {
        $j('#navbar_square_profile').removeClass("background-color-changed");
        $j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').addClass("background-color-changed");
    }

    $j(document).on('scroll', window, function() {
        if (isScrolledIntoView($j('.section-two-wrapper'))) {
            paintProfile();
        } else if (isScrolledIntoView($j('.section-three-wrapper'))) {
            paintExperiences();
        } else if (isScrolledIntoView($j('.skills-section-wrapper'))) {
            paintAbilities();
        } else if (isScrolledIntoView($j('.section-five-wrapper'))) {
            paintProject();
        } else if (isScrolledIntoView($j('.slider-section-wrapper'))) {
            paintReview();
        } else if (isScrolledIntoView($j('.footer-section-wrapper'))) {
            paintContact();
        }
    });
});

//scroll to div
$j(document).ready(function() {
    $j("#section_one_arrow_down").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-two-wrapper").offset().top
        }, 500);
    });

    $j("#navbar_square_up").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-one-wrapper").offset().top
        }, 500);
        /*$j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_profile').removeClass("background-color-changed");*/
    });

    $j("#navbar_square_profile").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-two-wrapper").offset().top
        }, 500);
        /*$j('#navbar_square_experiences').removeClass("background-color-changed");
        $j('#navbar_square_abilities').removeClass("background-color-changed");
        $j('#navbar_square_projects').removeClass("background-color-changed");
        $j('#navbar_square_review').removeClass("background-color-changed");
        $j('#navbar_square_contact').removeClass("background-color-changed");
        $j('#navbar_square_profile').addClass("background-color-changed");*/
    });

    $j("#navbar_square_experiences").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-three-wrapper").offset().top
        }, 500);
        /* $j('#navbar_square_profile').removeClass("background-color-changed");
         $j('#navbar_square_abilities').removeClass("background-color-changed");
         $j('#navbar_square_projects').removeClass("background-color-changed");
         $j('#navbar_square_review').removeClass("background-color-changed");
         $j('#navbar_square_contact').removeClass("background-color-changed");
         $j('#navbar_square_experiences').addClass("background-color-changed");*/
    });

    $j("#navbar_square_abilities").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-four-wrapper").offset().top
        }, 500);
        /* $j('#navbar_square_profile').removeClass("background-color-changed");
         $j('#navbar_square_projects').removeClass("background-color-changed");
         $j('#navbar_square_review').removeClass("background-color-changed");
         $j('#navbar_square_contact').removeClass("background-color-changed");
         $j('#navbar_square_experiences').removeClass("background-color-changed");
         $j('#navbar_square_abilities').addClass("background-color-changed");*/
    });

    $j("#navbar_square_projects").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-five-wrapper").offset().top
        }, 500);
        /*   $j('#navbar_square_profile').removeClass("background-color-changed");
           $j('#navbar_square_review').removeClass("background-color-changed");
           $j('#navbar_square_contact').removeClass("background-color-changed");
           $j('#navbar_square_experiences').removeClass("background-color-changed");
           $j('#navbar_square_abilities').removeClass("background-color-changed");
           $j('#navbar_square_projects').addClass("background-color-changed");*/
    });

    $j("#navbar_square_review").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".section-six-wrapper").offset().top
        }, 500);
        /*   $j('#navbar_square_profile').removeClass("background-color-changed");
           $j('#navbar_square_contact').removeClass("background-color-changed");
           $j('#navbar_square_experiences').removeClass("background-color-changed");
           $j('#navbar_square_abilities').removeClass("background-color-changed");
           $j('#navbar_square_projects').removeClass("background-color-changed");
           $j('#navbar_square_review').addClass("background-color-changed");*/
    });

    $j("#navbar_square_contact").click(function() {
        $j('html, body').animate({
            scrollTop: $j(".footer-section-wrapper").offset().top
        }, 500);
        /*    $j('#navbar_square_profile').removeClass("background-color-changed");
            $j('#navbar_square_experiences').removeClass("background-color-changed");
            $j('#navbar_square_abilities').removeClass("background-color-changed");
            $j('#navbar_square_projects').removeClass("background-color-changed");
            $j('#navbar_square_review').removeClass("background-color-changed");
            $j('#navbar_square_contact').addClass("background-color-changed");*/
    });
});

$j(document).ready(function() {
    $j("#language_rs").click(function() {
        if (i = 2) {
            var i = 1;
            $j("#language_rs").animate({
                right: '20px'
            }, 200)
            $j("#language_gb").animate({
                right: '90px'
            }, 200)
        } else {
            var i = 2;
            $j("#language_rs").animate({
                right: '90px'
            }, 200)
            $j("#language_gb").animate({
                right: '20px'
            }, 200)
        }
    })
});

$j(document).ready(function() {
    $j("#language_gb").click(function() {
        if (i = 2) {
            var i = 1;
            $j("#language_gb").animate({
                right: '20px'
            }, 200)
            $j("#language_rs").animate({
                right: '90px'
            }, 200)
        } else {
            var i = 2;
            $j("#language_gb").animate({
                right: '90px'
            }, 200)
            $j("#language_rs").animate({
                right: '20px'
            }, 200)
        }
    })
});

var arrLang = {





    'language_gb': {
        'introduce': 'Let me introduce myself',
        'profile': 'Profile',
        'experience': 'Experience',
        'projects': 'Projects',
        'abilities': 'Abilities',
        'review': 'Review',
        'contact': 'Contact',
        'profileNaslov': 'Profile',
        'creative': 'I\'m a creative webprogrammer',
        'aboutme': 'About me',
        'aboutmetext': 'I\'m a web programmer with good knowledge of front- end techniques, and im getting better every day.I have excellent skills in communication, individual and team work.Good eyes for detailes, quickly addopt new skills and highly motivated to improve my knowledge.',
        'details': 'Details',
        'name': 'Name:',
        'born': 'Born:',
        'location': 'Location:',
        'mesto': 'Leskovac, Serbia, Earth',
        'experienceNaslov': 'Experience',
        'goodjudgment': '"Good judgment comes from experience, and a lot of that comes from bad judgments" - Will Rogers',
        'education': 'Education',
        'highschool': 'High School',
        'date1': 'Sep 2008 - July 2012',
        'highschoolright': 'High school degree - Gymnasium in Leskovac',
        'hightext': 'I graduate highschool, where I enjoyed doing math and informatic even i was on social studies. I realized in my 4th year of school that i wanted to do something with programming and so i started my education on Faculty of Electronic Engineering in Niš.',
        'faculty': 'Faculty of Electronic Engineering',
        'date2': 'Oct 2012 -',
        'facultyright': 'Computer Science and Informatics',
        'facultytext': 'I started my education here, and get in touch with various programming languages, but webprogramming draw my attention. After that moment, I have started the education mainly based on webprogramming HTML, CSS, Javascript, frameworks like Bootstrap, Magento, Node.js and javascript library React…',
        'career': 'Career',
        'hackathon': 'Hackathon',
        'date3': '25 May 2018 - 27 May 2018',
        'hackathonright': 'Hackathon - Code Government',
        'hackathontext': 'The goal of this Hackathon was to find innovative solutions that will make the portal “eUprava” simpler and more attractive to use. So my team and i signed up for this project. We spent a great time, learned a lot of new things and It was a great experience…',
        'projectsNaslov': 'Projects',
        'thejourney': '"The journey of a thousand miles begins with one step." - Lao Tzu',
        'lotomark': 'Lotomark is a company in Novi Sad involved in SMS-marketing.',
        'tehnologije': 'Technology:',
        'miticplast': 'Mitic Plast is firm involved in production and sales products from polypropylene.',
        'abilitiesNaslov': 'Abilities',
        'ifopportunity': '"If opportunity doesn\'t knock, build a door." - Milton Berle',
        'skills': 'Skills',
        'languagesNaslov': 'Languages',
        'serbianLanguage': 'Serbian (Mother tongue)',
        'englishLanguage': 'English',
        'frenchLanguage': 'French (high school)',
        'germanLanguage': 'German (Elementary school)',
        'toolsNaslov': 'Tools',
        'reviewNaslov': 'Review',
        'togowrongin': '"The greatest trick the devil ever pulled was convicing the world he didn\'t exist." ― The Usual Suspects, 1995',
        'contactNaslov': 'Contact',
        'carpediem': '"Carpe diem. Seize the day, boys. Make your lives extraordinary." - Dead Poets Society, 1989',
    },
    'language_rs': {
        'introduce': 'Dozvolite mi da se predstavim',
        'profile': 'Profil',
        'experience': 'Iskustvo',
        'projects': 'Projekti',
        'abilities': 'Sposobnosti',
        'review': 'Recenzija',
        'contact': 'Kontakt',
        'profileNaslov': 'Profil',
        'creative': 'Ja sam kreativan webprogramer',
        'aboutme': 'O meni',
        'aboutmetext': 'Ja sam web programer, koji dobro poznaje front-end tehnike, i svakog dana sve vise napredujem. Imam odlične veštine u komunikaciji, kako za samostalan tako i za timski rad. Dobro zapažam detalje, brzo usvajam nova saznanja i veoma sam motivisan da unapredim svoje znanje.',
        'details': 'Pojedinosti',
        'name': 'Ime:',
        'born': 'Rođen:',
        'location': 'Mesto:',
        'mesto': 'Leskovac, Srbija, Zemlja',
        'experienceNaslov': 'Iskustvo',
        'goodjudgment': '“Dobre procene dolaze sa iskustvom, a iskustvo sa lošim procenama” -  Vil Rodzers',
        'education': 'Obrazovanje',
        'highschool': 'Srednja škola',
        'date1': 'Sep 2008 - Jul 2012',
        'highschoolright': 'Diploma srednje škole - Gimnazija u Leskovcu',
        'hightext': 'Završio sam srednju školu, gde su mi omiljeni predmeti bili matematika i informatika, iako sam bio na drušveno-jezičkom smeru. Shvatio sam na IV godini, da želim da se bavim programiranjem, tako sam započeo svoje obrazovanje na Elektronskom fakultetu u Niš-u',
        'faculty': 'Elektronski Fakultet u Nišu',
        'date2': 'Okt 2012 -',
        'facultyright': 'Računarstvo i informatika',
        'facultytext': 'Krenuo sam svoje obrazovanje ovde i prvi put stupio u kontakt sa mnogim programskim jezicima, ali moju paznju je privuklo web programiranje. Nakon toga sam se bazirao uglavnom na učenje web tehnologija HTML, CSS, Javascript, framework-e kao što su Bootstrap, Magento, Node.js i javascript biblioteke, kao što je React...',
        'career': 'Karijera',
        'hackathon': 'Hackathon',
        'date3': '25 Maj 2018 - 27 Maj 2018',
        'hackathonright': 'Hackathon - Kodiraj Državu',
        'hackathontext': 'Cilj ovog Hackatona je bio da se nađe inovativno rešenje za portal "e-uprava", za lakše i atraktivnije za korišćenje. Tako smo se moj tim i ja prijavili za ovaj projekat. Proveli smo sjajne trenutke i naučili dosta na tom Hackathon-u, bilo je to predivno iskustvo...',
        'projectsNaslov': 'Projekti',
        'thejourney': '“Putovanje od hiljadu milja počinje prvim korakom” Lao Ce',
        'lotomark': 'Lotomark je kompanija iz Novog Sada, koja se bavi SMS marketingom',
        'tehnologije': 'Tehnologije:',
        'miticplast': 'Mitić Plast je firma koja se bavi proizvodnjom i prodajom proizvoda od polipropilena.',
        'abilitiesNaslov': 'Sposobnosti',
        'ifopportunity': '"Ako prilika ne pokuca, izgradite vrata.“ - Milton Berle',
        'skills' : 'Veštine',
        'languagesNaslov': 'Jezici',
        'serbianLanguage': 'Srpski (Maternji jezik)',
        'englishLanguage': 'Engleski',
        'frenchLanguage': 'Francuski (Srednja škola)',
        'germanLanguage': 'Nemački (Osnovna škola)',
        'toolsNaslov': 'Alati',
        'reviewNaslov': 'Recenzije',
        'togowrongin': '"Najveći trik koji je đavo izveo je da ubedi svet da nije ni postojao." - Dežurni krivci, 1995',
        'contactNaslov': 'Kontakt',
        'carpediem': '"Carpe diem. Iskoristite dan momci. Učinite vaše živote izvanrednim." - Društvo mrtvih pesnika, 1989',
    }

};

$j(function (){
    $j('.language-change').click(function(){

        var lang = $j(this).attr('id');

        $j('.lang').each(function(index, element){
            $j(this).text(arrLang[lang][$j(this).attr('key')]);
        });
    });
});