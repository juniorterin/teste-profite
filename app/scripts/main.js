'use strict';

// Lazy

var bLazy = new Blazy();

// Vitrine

$('.vitrine-itens').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        }
    }
});

$('.vitrine .btn-carrossel-avancar').click(function() {
    $('.vitrine-itens').trigger('next.owl.carousel');
});

$('.vitrine .btn-carrossel-voltar').click(function() {
    $('.vitrine-itens').trigger('prev.owl.carousel');
});

$('.vitrine-itens').on('changed.owl.carousel', function(event) {
    bLazy.revalidate();
    console.log('changed carrosel');
});

// JSON de Produtos

var produtos = {
  'calcados': [
    {
      'Titulo': 'Sandália Ferracini Ecologic',
      'Rating': 1,
      'OldPriceIn': 200.00,
      'Price': 95.92,
      'Parcelamento': 5,
      'Imagem': 'calcado1'
    },
    {
      'Titulo': 'Chinelo Kildare',
      'Rating': 2,
      'OldPriceIn': 90.00,
      'Price': 79.92,
      'Parcelamento': 4,
      'Imagem': 'calcado2'
    },
    {
      'Titulo': 'Tênis Ferracini Week',
      'Rating': 3,
      'OldPriceIn': 154.77,
      'Price': 99.90,
      'Parcelamento': 12,
      'Imagem': 'calcado3'
    },
    {
      'Titulo': 'Tênis Democrata Fan',
      'Rating': 4,
      'OldPriceIn': 353.77,
      'Price': 99.90,
      'Parcelamento': 4,
      'Imagem': 'calcado4'
    },
]
};

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

var _produtos = Object.keys(produtos).reduce(
              (m,c) => m.concat(produtos[c].map(
                (i) => (i.category = c) && i))
           , []);

_produtos.forEach((d) => {

	// Variaveis de preco

	var preco = d.Price;
	if(d.OldPriceIn) { var precoAntigo = d.OldPriceIn; }
	var parcelado = Math.round(d.Price / d.Parcelamento);
	var economia = Math.round(d.OldPriceIn - d.Price);

  // Rating

  var ranking = d.Rating;

  function rankingProduto() {
    String.prototype.repetir = function(vezes) {
       return (new Array(vezes + 1)).join(this);
    };
    var s = '<svg class="icones"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#estrela"></use></svg>'.repetir(ranking);
    return s;
  };

	// Template

  var produto = $('<article class="carrossel-produto" itemscope itemtype="http://schema.org/Product"/>');

  produto.append('<a class="foto-zoom" href="images/sapatos/' + d.Imagem + '_zoom.png"><img data-mh="foto-produto" class="foto-produto" itemprop="image" src="images/sapatos/' + d.Imagem + '.png" alt="' + d.Titulo + '"></a>');
  produto.append('<a class="foto-zoom" href="images/sapatos/' + d.Imagem + '_zoom.png"><img data-mh="foto-produto" class="foto-produto-hover" itemprop="image" src="images/sapatos/' + d.Imagem + '_hover.png" alt="' + d.Titulo + '"></a>');
  produto.append('<h2 data-mh="altura-titulo" itemprop="name">' + d.Titulo + '</h2>');
  produto.append('<p class="avaliacao" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"><span class="hidden" itemprop="ratingValue">' + d.Rating + '</span>' + rankingProduto() + '</p>');
  produto.append('<div class="produto-valor">');
  produto.append('	<meta itemprop="priceCurrency" content="R$" />');
  if (d.OldPriceIn) {
  	produto.append('	<p class="preco preco-anterior"><strong>De: <em>R$ <span itemprop="price">' + precoAntigo + '</span></em></strong></p>');
  };
  produto.append('	<p class="preco"><strong>Por: <em>R$ <span itemprop="price">' + preco + '</span></em></strong></p>');
  produto.append('</div>');
  produto.append('<p class="preco preco-parcelado"><em>ou <strong>até ' + d.Parcelamento + 'x</strong> de <strong>R$ ' + parcelado + '</strong></em></p>');
  produto.append('<p class="comprar"><a class="btn-comprar" href="#">Comprar</a></p>');
  if (d.OldPriceIn) {
  	produto.append('<p class="economize">Economize: R$' + economia + '</p>');
  };

  $('.carrossel-produtos').append(produto);

});

// Carrossel de produtos

$('.carrossel-produtos').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:3
        },
        1024:{
            items:4
        }
    }
});

$('.produtos .btn-carrossel-avancar').click(function() {
    $('.carrossel-produtos').trigger('next.owl.carousel');
});

$('.produtos .btn-carrossel-voltar').click(function() {
    $('.carrossel-produtos').trigger('prev.owl.carousel');
});

// Travando a ancora dos botoes do carrossel

$('.btn-carrossel-avancar, .btn-carrossel-voltar').click(function(event) {
    event.preventDefault();
});

// Lightbox (luminous js)

var options_lum = {
	// Prefix for generated element class names (e.g. `my-ns` will
	// result in classes such as `my-ns-lightbox`. Default `lum-`
	// prefixed classes will always be added as well.
	namespace: null,
	// Which attribute to pull the lightbox image source from.
	sourceAttribute: 'href',
	// Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.
	caption: null,
	// The event to listen to on the _trigger_ element: triggers opening.
	openTrigger: 'click',
	// The event to listen to on the _lightbox_ element: triggers closing.
	closeTrigger: 'click',
	// Allow closing by pressing escape.
	closeWithEscape: true,
	// Automatically close when the page is scrolled.
	closeOnScroll: false,
	// A selector defining what to append the lightbox element to.
	appendToSelector: 'body',
	// If present (and a function), this will be called
	// whenever the lightbox is opened.
	onOpen: null,
	// If present (and a function), this will be called
	// whenever the lightbox is closed.
	onClose: null,
	// When true, adds the `imgix-fluid` class to the `img`
	// inside the lightbox. See https://github.com/imgix/imgix.js
	// for more information.
	includeImgixJSClass: false,
	// Add base styles to the page. See the "Theming"
	// section of README.md for more information.
	injectBaseStyles: true,
};

$(function() {
  $('.foto-zoom').each(function(i, el) {
    new Luminous(el, options_lum);
  });
});