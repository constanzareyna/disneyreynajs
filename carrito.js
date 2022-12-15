let prods_contenedor = document.getElementById('productos_div');
let container_carrito = document.getElementById('container_carrito');
let comprar_vaciar_carrito = document.getElementById('comprar');
let contador_carrito = document.getElementById('contador');
let cantidad = document.getElementById('cantidad');
let total = document.getElementById('total');

let cont_modal = document.getElementsByClassName('container_modal')[0];
let btn_abrir = document.getElementById('carrito_btn');
let btn_cerrar = document.getElementById('carrito_cerrar');
let carrito_modal = document.getElementsByClassName('carrito_modal')[0];
let eleccion = confirm("Este sitio web utiliza cookies para mejorar su experiencia.")

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizar_carrito();
    }
});


/*muestra el carrito al apretar el botón */
btn_abrir.addEventListener('click', ()=>{
    cont_modal.classList.toggle('modal-active');
});

/* permite cerrar el carrito boton superior*/
btn_cerrar.addEventListener('click', ()=>{
    cont_modal.classList.toggle('modal-active');
});

/* hace que aparezca el carrito y permite cerralo presionando fuera del contenedor */
cont_modal.addEventListener('click', (event) =>{
    cont_modal.classList.toggle('modal-active');
});

carrito_modal.addEventListener('click', (event) => {
    event.stopPropagation();
});


/* botón para realizar la compra y que a su vez vacía el carrito.*/

comprar_vaciar_carrito.addEventListener('click', () => {
    
    if (carrito.length === 0){
        Swal.fire({
            title: "NO HAY PRODUCTOS",
            text: "No has seleccionado ningún parque para comprar",
            icon: "error",
            confirmButtonColor: "#628601",
        });
    }

    else {
        Swal.fire({
            title: "COMPRA REALIZADA",
            text: "Disney es magia, es diversión",
            icon: "success",
            confirmButtonColor: "#628601",
        });
        
    }
    carrito.length = 0;
    actualizar_carrito();
});



stock_prods.forEach((producto) => {
    let div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <div class="cantainer_card">
    <h3>${producto.nombre}</h3>
    <p class="precio_prod">$${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton_agregar">Agregar</button>
    </div>
    `
    prods_contenedor.appendChild(div);

    let boton = document.getElementById(`agregar${producto.id}`);



    boton.addEventListener('click', () => {

        agregar_carrito(producto.id);
        
    });
    
});



let agregar_carrito = (prodId) => {
    let existe = carrito.some (prod => prod.id === prodId);

    if (existe){ 
        let prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++;
            }
        });
    } else { 
        let item = stock_prods.find((prod) => prod.id === prodId);
        carrito.push(item);
    }

    Toastify({
        text: "Parque agregado",
        duration: 800,
        style: {
            background: "#BFB3D0",
            color: "black",
            fontFamily: "Cinzel"
        }
        
        }).showToast();
    
    actualizar_carrito(); 
}

/*borra un elemento a través de su indice en el array del carrito */

let quitar_producto = (prodId) => {
    let item = carrito.find((prod) => prod.id === prodId);
    let indice = carrito.indexOf(item);
    carrito.splice(indice, 1); 
    actualizar_carrito();

}

/* cuando se llama a "actualizar_carrito", el carrito queda en cero */

let actualizar_carrito = () => {
    container_carrito.innerHTML = "";

/* se crea un div por cada producto seleccionado para mostrarlo dentro del carrito y se agrega
un botón para poder eliminar cualquier producto del carrito */

    carrito.forEach((prod) => {
        let div = document.createElement('div');
        div.className = ('prods_seleccionados');
        div.innerHTML = `
        <img style="width: 10%;" src="${prod.img}">
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="quitar_producto(${prod.id})" class="btn_eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        container_carrito.appendChild(div);
        
        localStorage.setItem('carrito', JSON.stringify(carrito));

    });
    
    /* contador de productos */

    contador_carrito.innerText = carrito.length;

    /* contador de precios */

    total.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

};

/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function(root, factory) {
    if (typeof module === "object" && module.exports) {
      module.exports = factory();
    } else {
      root.Toastify = factory();
    }
  })(this, function(global) {
    // Object initialization
    var Toastify = function(options) {
        // Returning a new init object
        return new Toastify.lib.init(options);
      },
      // Library version
      version = "1.12.0";
  
    // Set the default global options
    Toastify.defaults = {
      oldestFirst: true,
      text: "Toastify is awesome!",
      node: undefined,
      duration: 3000,
      selector: undefined,
      callback: function () {
      },
      destination: undefined,
      newWindow: false,
      close: false,
      gravity: "toastify-top",
      positionLeft: false,
      position: '',
      backgroundColor: '',
      avatar: "",
      className: "",
      stopOnFocus: true,
      onClick: function () {
      },
      offset: {x: 0, y: 0},
      escapeMarkup: true,
      ariaLive: 'polite',
      style: {background: ''}
    };
  
    // Defining the prototype of the object
    Toastify.lib = Toastify.prototype = {
      toastify: version,
  
      constructor: Toastify,
  
      // Initializing the object with required parameters
      init: function(options) {
        // Verifying and validating the input object
        if (!options) {
          options = {};
        }
  
        // Creating the options object
        this.options = {};
  
        this.toastElement = null;
  
        // Validating the options
        this.options.text = options.text || Toastify.defaults.text; // Display message
        this.options.node = options.node || Toastify.defaults.node;  // Display content as node
        this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
        this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
        this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
        this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
        this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
        this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
        this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
        this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
        this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
        this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
        this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
        this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
        this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
        this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
        this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
        this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
        this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
        this.options.style = options.style || Toastify.defaults.style;
        if(options.backgroundColor) {
          this.options.style.background = options.backgroundColor;
        }
  
        // Returning the current object for chaining functions
        return this;
      },
  
      // Building the DOM element
      buildToast: function() {
        // Validating if the options are defined
        if (!this.options) {
          throw "Toastify is not initialized";
        }
  
        // Creating the DOM object
        var divElement = document.createElement("div");
        divElement.className = "toastify on " + this.options.className;
  
        // Positioning toast to left or right or center
        if (!!this.options.position) {
          divElement.className += " toastify-" + this.options.position;
        } else {
          // To be depreciated in further versions
          if (this.options.positionLeft === true) {
            divElement.className += " toastify-left";
            console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
          } else {
            // Default position
            divElement.className += " toastify-right";
          }
        }
  
        // Assigning gravity of element
        divElement.className += " " + this.options.gravity;
  
        if (this.options.backgroundColor) {
          // This is being deprecated in favor of using the style HTML DOM property
          console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
        }
  
        // Loop through our style object and apply styles to divElement
        for (var property in this.options.style) {
          divElement.style[property] = this.options.style[property];
        }
  
        // Announce the toast to screen readers
        if (this.options.ariaLive) {
          divElement.setAttribute('aria-live', this.options.ariaLive)
        }
  
        // Adding the toast message/node
        if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
          // If we have a valid node, we insert it
          divElement.appendChild(this.options.node)
        } else {
          if (this.options.escapeMarkup) {
            divElement.innerText = this.options.text;
          } else {
            divElement.innerHTML = this.options.text;
          }
  
          if (this.options.avatar !== "") {
            var avatarElement = document.createElement("img");
            avatarElement.src = this.options.avatar;
  
            avatarElement.className = "toastify-avatar";
  
            if (this.options.position == "left" || this.options.positionLeft === true) {
              // Adding close icon on the left of content
              divElement.appendChild(avatarElement);
            } else {
              // Adding close icon on the right of content
              divElement.insertAdjacentElement("afterbegin", avatarElement);
            }
          }
        }
  
        // Adding a close icon to the toast
        if (this.options.close === true) {
          // Create a span for close element
          var closeElement = document.createElement("button");
          closeElement.type = "button";
          closeElement.setAttribute("aria-label", "Close");
          closeElement.className = "toast-close";
          closeElement.innerHTML = "&#10006;";
  
          // Triggering the removal of toast from DOM on close click
          closeElement.addEventListener(
            "click",
            function(event) {
              event.stopPropagation();
              this.removeElement(this.toastElement);
              window.clearTimeout(this.toastElement.timeOutValue);
            }.bind(this)
          );
  
          //Calculating screen width
          var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  
          // Adding the close icon to the toast element
          // Display on the right if screen width is less than or equal to 360px
          if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
            // Adding close icon on the left of content
            divElement.insertAdjacentElement("afterbegin", closeElement);
          } else {
            // Adding close icon on the right of content
            divElement.appendChild(closeElement);
          }
        }
  
        // Clear timeout while toast is focused
        if (this.options.stopOnFocus && this.options.duration > 0) {
          var self = this;
          // stop countdown
          divElement.addEventListener(
            "mouseover",
            function(event) {
              window.clearTimeout(divElement.timeOutValue);
            }
          )
          // add back the timeout
          divElement.addEventListener(
            "mouseleave",
            function() {
              divElement.timeOutValue = window.setTimeout(
                function() {
                  // Remove the toast from DOM
                  self.removeElement(divElement);
                },
                self.options.duration
              )
            }
          )
        }
  
        // Adding an on-click destination path
        if (typeof this.options.destination !== "undefined") {
          divElement.addEventListener(
            "click",
            function(event) {
              event.stopPropagation();
              if (this.options.newWindow === true) {
                window.open(this.options.destination, "_blank");
              } else {
                window.location = this.options.destination;
              }
            }.bind(this)
          );
        }
  
        if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
          divElement.addEventListener(
            "click",
            function(event) {
              event.stopPropagation();
              this.options.onClick();
            }.bind(this)
          );
        }
  
        // Adding offset
        if(typeof this.options.offset === "object") {
  
          var x = getAxisOffsetAValue("x", this.options);
          var y = getAxisOffsetAValue("y", this.options);
  
          var xOffset = this.options.position == "left" ? x : "-" + x;
          var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
  
          divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
  
        }
  
        // Returning the generated element
        return divElement;
      },
  
      // Displaying the toast
      showToast: function() {
        // Creating the DOM object for the toast
        this.toastElement = this.buildToast();
  
        // Getting the root element to with the toast needs to be added
        var rootElement;
        if (typeof this.options.selector === "string") {
          rootElement = document.getElementById(this.options.selector);
        } else if (this.options.selector instanceof HTMLElement || (typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)) {
          rootElement = this.options.selector;
        } else {
          rootElement = document.body;
        }
  
        // Validating if root element is present in DOM
        if (!rootElement) {
          throw "Root element is not defined";
        }
  
        // Adding the DOM element
        var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
        rootElement.insertBefore(this.toastElement, elementToInsert);
  
        // Repositioning the toasts in case multiple toasts are present
        Toastify.reposition();
  
        if (this.options.duration > 0) {
          this.toastElement.timeOutValue = window.setTimeout(
            function() {
              // Remove the toast from DOM
              this.removeElement(this.toastElement);
            }.bind(this),
            this.options.duration
          ); // Binding `this` for function invocation
        }
  
        // Supporting function chaining
        return this;
      },
  
      hideToast: function() {
        if (this.toastElement.timeOutValue) {
          clearTimeout(this.toastElement.timeOutValue);
        }
        this.removeElement(this.toastElement);
      },
  
      // Removing the element from the DOM
      removeElement: function(toastElement) {
        // Hiding the element
        // toastElement.classList.remove("on");
        toastElement.className = toastElement.className.replace(" on", "");
  
        // Removing the element from DOM after transition end
        window.setTimeout(
          function() {
            // remove options node if any
            if (this.options.node && this.options.node.parentNode) {
              this.options.node.parentNode.removeChild(this.options.node);
            }
  
            // Remove the element from the DOM, only when the parent node was not removed before.
            if (toastElement.parentNode) {
              toastElement.parentNode.removeChild(toastElement);
            }
  
            // Calling the callback function
            this.options.callback.call(toastElement);
  
            // Repositioning the toasts again
            Toastify.reposition();
          }.bind(this),
          400
        ); // Binding `this` for function invocation
      },
    };
  
    // Positioning the toasts on the DOM
    Toastify.reposition = function() {
  
      // Top margins with gravity
      var topLeftOffsetSize = {
        top: 15,
        bottom: 15,
      };
      var topRightOffsetSize = {
        top: 15,
        bottom: 15,
      };
      var offsetSize = {
        top: 15,
        bottom: 15,
      };
  
      // Get all toast messages on the DOM
      var allToasts = document.getElementsByClassName("toastify");
  
      var classUsed;
  
      // Modifying the position of each toast element
      for (var i = 0; i < allToasts.length; i++) {
        // Getting the applied gravity
        if (containsClass(allToasts[i], "toastify-top") === true) {
          classUsed = "toastify-top";
        } else {
          classUsed = "toastify-bottom";
        }
  
        var height = allToasts[i].offsetHeight;
        classUsed = classUsed.substr(9, classUsed.length-1)
        // Spacing between toasts
        var offset = 15;
  
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  
        // Show toast in center if screen with less than or equal to 360px
        if (width <= 360) {
          // Setting the position
          allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
  
          offsetSize[classUsed] += height + offset;
        } else {
          if (containsClass(allToasts[i], "toastify-left") === true) {
            // Setting the position
            allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
  
            topLeftOffsetSize[classUsed] += height + offset;
          } else {
            // Setting the position
            allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
  
            topRightOffsetSize[classUsed] += height + offset;
          }
        }
      }
  
      // Supporting function chaining
      return this;
    };
  
    // Helper function to get offset.
    function getAxisOffsetAValue(axis, options) {
  
      if(options.offset[axis]) {
        if(isNaN(options.offset[axis])) {
          return options.offset[axis];
        }
        else {
          return options.offset[axis] + 'px';
        }
      }
  
      return '0px';
  
    }
  
    function containsClass(elem, yourClass) {
      if (!elem || typeof yourClass !== "string") {
        return false;
      } else if (
        elem.className &&
        elem.className
          .trim()
          .split(/\s+/gi)
          .indexOf(yourClass) > -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    // Setting up the prototype for the init object
    Toastify.lib.init.prototype = Toastify.lib;
  
    // Returning the Toastify function to be assigned to the window object/module
    return Toastify;
  });

  /*!
* sweetalert2 v11.6.15
* Released under the MIT License.
*/
!function(e,t)
{"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Sweetalert2=t()}
(this,(function(){"use strict";var e={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};
const t=e=>{const t={};
for(const n in e)t[e[n]]="swal2-"+e[n];return t},n=t(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),o=t(["success","warning","info","question","error"]),i=e=>e.charAt(0).toUpperCase()+e.slice(1),s=e=>{console.warn(`SweetAlert2: ${"object"==typeof e?e.join(" "):e}`)},r=e=>{console.error(`SweetAlert2: ${e}`)},a=[],l=(e,t)=>{var n;n=`"${e}" is deprecated and will be removed in the next major release. Please use "${t}" instead.`,a.includes(n)||(a.push(n),s(n))},c=e=>"function"==typeof e?e():e,u=e=>e&&"function"==typeof e.toPromise,d=e=>u(e)?e.toPromise():Promise.resolve(e),p=e=>e&&Promise.resolve(e)===e,m=()=>document.body.querySelector(`.${n.container}`),g=e=>{const t=m();return t?t.querySelector(e):null},h=e=>g(`.${e}`),f=()=>h(n.popup),b=()=>h(n.icon),y=()=>h(n.title),w=()=>h(n["html-container"]),v=()=>h(n.image),C=()=>h(n["progress-steps"]),A=()=>h(n["validation-message"]),k=()=>g(`.${n.actions} .${n.confirm}`),B=()=>g(`.${n.actions} .${n.deny}`),P=()=>g(`.${n.loader}`),x=()=>g(`.${n.actions} .${n.cancel}`),E=()=>h(n.actions),$=()=>h(n.footer),T=()=>h(n["timer-progress-bar"]),S=()=>h(n.close),L=()=>{const e=Array.from(f().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(((e,t)=>{const n=parseInt(e.getAttribute("tabindex")),o=parseInt(t.getAttribute("tabindex"));return n>o?1:n<o?-1:0})),t=Array.from(f().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter((e=>"-1"!==e.getAttribute("tabindex")));return(e=>
  {const t=[];for(let n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t})(e.concat(t)).filter((e=>Z(e)))},O=()=>I(document.body,n.shown)&&!I(document.body,n["toast-shown"])&&!I(document.body,n["no-backdrop"]),j=()=>f()&&I(f(),n.toast),M={previousBodyPadding:null},H=(e,t)=>{if(e.textContent="",t){const n=(new DOMParser).parseFromString(t,"text/html");Array.from(n.querySelector("head").childNodes).forEach((t=>{e.appendChild(t)})),Array.from(n.querySelector("body").childNodes).forEach((t=>{t instanceof HTMLVideoElement||t instanceof HTMLAudioElement?e.appendChild(t.cloneNode(!0)):e.appendChild(t)}))}},I=(e,t)=>{if(!t)return!1;const n=t.split(/\s+/);for(let t=0;t<n.length;t++)if(!e.classList.contains(n[t]))return!1;return!0},D=(e,t,i)=>{if(((e,t)=>{Array.from(e.classList).forEach((i=>{Object.values(n).includes(i)||Object.values(o).includes(i)||Object.values(t.showClass).includes(i)||e.classList.remove(i)}))})(e,t),t.customClass&&t.customClass[i]){if("string"!=typeof t.customClass[i]&&!t.customClass[i].forEach)return void s(`Invalid type of customClass.${i}! Expected string or iterable object, got "${typeof t.customClass[i]}"`);F(e,t.customClass[i])}},q=(e,t)=>
{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(`.${n.popup} > .${n[t]}`);case"checkbox":return e.querySelector(`.${n.popup} > .${n.checkbox} input`);case"radio":return e.querySelector(`.${n.popup} > .${n.radio} input:checked`)||e.querySelector(`.${n.popup} > .${n.radio} input:first-child`);case"range":return e.querySelector(`.${n.popup} > .${n.range} input`);default:return e.querySelector(`.${n.popup}>.${n.input}`)}},V=e=>
{if(e.focus(),"file"!==e.type){const t=e.value;e.value="",e.value=t}},N=(e,t,n)=>{e&&t&&("string"==typeof t&&(t=t.split(/\s+/).filter(Boolean)),t.forEach((t=>{Array.isArray(e)?e.forEach((e=>{n?e.classList.add(t):e.classList.remove(t)})):n?e.classList.add(t):e.classList.remove(t)})))},F=(e,t)=>{N(e,t,!0)},R=(e,t)=>{N(e,t,!1)},U=(e,t)=>{const n=Array.from(e.children);for(let e=0;e<n.length;e++){const o=n[e];if(o instanceof HTMLElement&&I(o,t))return o}},_=(e,t,n)=>
{n===`${parseInt(n)}`&&(n=parseInt(n)),n||0===parseInt(n)?e.style[t]="number"==typeof n?`${n}px`:n:e.style.removeProperty(t)},W=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"flex";e.style.display=t},z=e=>{e.style.display="none"},K=(e,t,n,o)=>
{const i=e.querySelector(t);i&&(i.style[n]=o)},Y=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"flex";t?W(e,n):z(e)},Z=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),J=e=>!!(e.scrollHeight>e.clientHeight),X=e=>{const t=window.getComputedStyle(e),n=parseFloat(t.getPropertyValue("animation-duration")||"0"),o=parseFloat(t.getPropertyValue("transition-duration")||"0");return n>0||o>0},G=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=T();Z(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout((()=>
{n.style.transition=`width ${e/1e3}s linear`,n.style.width="0%"}),10))},Q={},ee=e=>new Promise((t=>{if(!e)return t();const n=window.scrollX,o=window.scrollY;Q.restoreFocusTimeout=setTimeout((()=>{Q.previousActiveElement instanceof HTMLElement?(Q.previousActiveElement.focus(),Q.previousActiveElement=null):document.body&&document.body.focus(),t()}),100),window.scrollTo(n,o)})),te=()=>"undefined"==typeof window||"undefined"==typeof document,ne=`\n <div aria-labelledby="${n.title}" aria-describedby="${n["html-container"]}" class="${n.popup}" tabindex="-1">\n   <button type="button" class="${n.close}"></button>\n   <ul class="${n["progress-steps"]}"></ul>\n   <div class="${n.icon}"></div>\n   <img class="${n.image}" />\n   <h2 class="${n.title}" id="${n.title}"></h2>\n   <div class="${n["html-container"]}" id="${n["html-container"]}"></div>\n   <input class="${n.input}" />\n   <input type="file" class="${n.file}" />\n   <div class="${n.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${n.select}"></select>\n   <div class="${n.radio}"></div>\n   <label for="${n.checkbox}" class="${n.checkbox}">\n     <input type="checkbox" />\n     <span class="${n.label}"></span>\n   </label>\n   <textarea class="${n.textarea}"></textarea>\n   <div class="${n["validation-message"]}" id="${n["validation-message"]}"></div>\n   <div class="${n.actions}">\n     <div class="${n.loader}"></div>\n     <button type="button" class="${n.confirm}"></button>\n     <button type="button" class="${n.deny}"></button>\n     <button type="button" class="${n.cancel}"></button>\n   </div>\n   <div class="${n.footer}"></div>\n   <div class="${n["timer-progress-bar-container"]}">\n     <div class="${n["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(/(^|\n)\s*/g,""),oe=()=>
{Q.currentInstance.resetValidationMessage()},ie=e=>{const t=(()=>{const e=m();return!!e&&(e.remove(),R([document.documentElement,document.body],[n["no-backdrop"],n["toast-shown"],n["has-column"]]),!0)})();if(te())return void r("SweetAlert2 requires document to initialize");const o=document.createElement("div");o.className=n.container,t&&F(o,n["no-transition"]),H(o,ne);const i="string"==typeof(s=e.target)?document.querySelector(s):s;var s;i.appendChild(o),(e=>{const t=f();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")})(e),(e=>{"rtl"===window.getComputedStyle(e).direction&&F(m(),n.rtl)})(i),(()=>
{const e=f(),t=U(e,n.input),o=U(e,n.file),i=e.querySelector(`.${n.range} input`),s=e.querySelector(`.${n.range} output`),r=U(e,n.select),a=e.querySelector(`.${n.checkbox} input`),l=U(e,n.textarea);t.oninput=oe,o.onchange=oe,r.onchange=oe,a.onchange=oe,l.oninput=oe,i.oninput=()=>{oe(),s.value=i.value},i.onchange=()=>{oe(),s.value=i.value}})()},se=(e,t)=>{e instanceof HTMLElement?t.appendChild(e):"object"==typeof e?re(e,t):e&&H(t,e)},re=(e,t)=>
{e.jquery?ae(t,e):H(t,e.toString())},ae=(e,t)=>{if(e.textContent="",0 in t)for(let n=0;n in t;n++)e.appendChild(t[n].cloneNode(!0));else e.appendChild(t.cloneNode(!0))},le=(()=>{if(te())return!1;const e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),ce=(e,t)=>{const o=E(),i=P();t.showConfirmButton||t.showDenyButton||t.showCancelButton?W(o):z(o),D(o,t,"actions"),function(e,t,o){const i=k(),s=B(),r=x();ue(i,"confirm",o),ue(s,"deny",o),ue(r,"cancel",o),function(e,t,o,i){if(!i.buttonsStyling)return void R([e,t,o],n.styled);F([e,t,o],n.styled),i.confirmButtonColor&&(e.style.backgroundColor=i.confirmButtonColor,F(e,n["default-outline"]));i.denyButtonColor&&(t.style.backgroundColor=i.denyButtonColor,F(t,n["default-outline"]));i.cancelButtonColor&&(o.style.backgroundColor=i.cancelButtonColor,F(o,n["default-outline"]))}(i,s,r,o),o.reverseButtons&&(o.toast?(e.insertBefore(r,i),e.insertBefore(s,i)):(e.insertBefore(r,t),e.insertBefore(s,t),e.insertBefore(i,t)))}(o,i,t),H(i,t.loaderHtml),D(i,t,"loader")};function ue(e,t,o){Y(e,o[`show${i(t)}Button`],"inline-block"),H(e,o[`${t}ButtonText`]),e.setAttribute("aria-label",o[`${t}ButtonAriaLabel`]),e.className=n[t],D(e,o,`${t}Button`),F(e,o[`${t}ButtonClass`])}const de=(e,t)=>
{const o=m();o&&(!function(e,t){"string"==typeof t?e.style.background=t:t||F([document.documentElement,document.body],n["no-backdrop"])}(o,t.backdrop),function(e,t){t in n?F(e,n[t]):(s('The "position" parameter is not valid, defaulting to "center"'),F(e,n.center))}(o,t.position),function(e,t){if(t&&"string"==typeof t){const o=`grow-${t}`;o in n&&F(e,n[o])}}(o,t.grow),D(o,t,"container"))};const pe=["input","file","range","select","radio","checkbox","textarea"],me=e=>{if(!ve[e.input])return void r(`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${e.input}"`);const t=ye(e.input),n=ve[e.input](t,e);W(t),setTimeout((()=>{V(n)}))},ge=(e,t)=>{const n=q(f(),e);if(n){(e=>
  {for(let t=0;t<e.attributes.length;t++)
  {const n=e.attributes[t].name;["type","value","style"].includes(n)||e.removeAttribute(n)}})(n);for(const e in t)n.setAttribute(e,t[e])}},he=e=>{const t=ye(e.input);"object"==typeof e.customClass&&F(t,e.customClass.input)},fe=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},be=(e,t,o)=>{if(o.inputLabel){e.id=n.input;const i=document.createElement("label"),s=n["input-label"];i.setAttribute("for",e.id),i.className=s,"object"==typeof o.customClass&&F(i,o.customClass.inputLabel),i.innerText=o.inputLabel,t.insertAdjacentElement("beforebegin",i)}},ye=e=>U(f(),n[e]||n.input),we=(e,t)=>{["string","number"].includes(typeof t)?e.value=`${t}`:p(t)||s(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`)},ve={};ve.text=ve.email=ve.password=ve.number=ve.tel=ve.url=(e,t)=>(we(e,t.inputValue),be(e,e,t),fe(e,t),e.type=t.input,e),ve.file=(e,t)=>(be(e,e,t),fe(e,t),e),ve.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return we(n,t.inputValue),n.type=t.input,we(o,t.inputValue),be(n,e,t),e},ve.select=(e,t)=>
  {if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");H(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return be(e,e,t),e},ve.radio=e=>(e.textContent="",e),ve.checkbox=(e,t)=>
  {const o=q(f(),"checkbox");o.value="1",o.id=n.checkbox,o.checked=Boolean(t.inputValue);const i=e.querySelector("span");return H(i,t.inputPlaceholder),o},ve.textarea=(e,t)=>{we(e,t.inputValue),fe(e,t),be(e,e,t);return setTimeout((()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(f()).width);new MutationObserver((()=>{const n=e.offsetWidth+(o=e,parseInt(window.getComputedStyle(o).marginLeft)+parseInt(window.getComputedStyle(o).marginRight));var o;f().style.width=n>t?`${n}px`:null})).observe(e,{attributes:!0,attributeFilter:["style"]})}})),e};const Ce=(t,o)=>
  {const i=w();D(i,o,"htmlContainer"),o.html?(se(o.html,i),W(i,"block")):o.text?(i.textContent=o.text,W(i,"block")):z(i),((t,o)=>{const i=f(),s=e.innerParams.get(t),r=!s||o.input!==s.input;pe.forEach((e=>{const t=U(i,n[e]);ge(e,o.inputAttributes),t.className=n[e],r&&z(t)})),o.input&&(r&&me(o),he(o))})(t,o)},Ae=(e,t)=>{for(const n in o)t.icon!==n&&R(e,o[n]);F(e,o[t.icon]),Pe(e,t),ke(),D(e,t,"icon")},ke=()=>
  {const e=f(),t=window.getComputedStyle(e).getPropertyValue("background-color"),n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Be=(e,t)=>{let n,o=e.innerHTML;if(t.iconHtml)n=xe(t.iconHtml);else if("success"===t.icon)n='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',o=o.replace(/ style=".*?"/g,"");else if("error"===t.icon)n='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';else{n=xe({question:"?",warning:"!",info:"i"}[t.icon])}o.trim()!==n.trim()&&H(e,n)},Pe=(e,t)=>
{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])K(e,n,"backgroundColor",t.iconColor);K(e,".swal2-success-ring","borderColor",t.iconColor)}},xe=e=>`<div class="${n["icon-content"]}">${e}</div>`,Ee=(e,t)=>{e.className=`${n.popup} ${Z(e)?t.showClass.popup:""}`,t.toast?(F([document.documentElement,document.body],n["toast-shown"]),F(e,n.toast)):F(e,n.modal),D(e,t,"popup"),"string"==typeof t.customClass&&F(e,t.customClass),t.icon&&F(e,n[`icon-${t.icon}`])},$e=e=>{const t=document.createElement("li");return F(t,n["progress-step"]),H(t,e),t},Te=e=>
  {const t=document.createElement("li");return F(t,n["progress-step-line"]),e.progressStepsDistance&&_(t,"width",e.progressStepsDistance),t},Se=(t,i)=>{((e,t)=>{const n=m(),o=f();t.toast?(_(n,"width",t.width),o.style.width="100%",o.insertBefore(P(),b())):_(o,"width",t.width),_(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),z(A()),Ee(o,t)})(0,i),de(0,i),((e,t)=>{const o=C();t.progressSteps&&0!==t.progressSteps.length?(W(o),o.textContent="",t.currentProgressStep>=t.progressSteps.length&&s("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),t.progressSteps.forEach(((e,i)=>
    {const s=$e(e);if(o.appendChild(s),i===t.currentProgressStep&&F(s,n["active-progress-step"]),i!==t.progressSteps.length-1){const e=Te(t);o.appendChild(e)}}))):z(o)})(0,i),((t,n)=>{const i=e.innerParams.get(t),s=b();if(i&&n.icon===i.icon)return Be(s,n),void Ae(s,n);if(n.icon||n.iconHtml){if(n.icon&&-1===Object.keys(o).indexOf(n.icon))return r(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${n.icon}"`),void z(s);W(s),Be(s,n),Ae(s,n),F(s,n.showClass.icon)}else z(s)})(t,i),((e,t)=>{const o=v();t.imageUrl?(W(o,""),o.setAttribute("src",t.imageUrl),o.setAttribute("alt",t.imageAlt),_(o,"width",t.imageWidth),_(o,"height",t.imageHeight),o.className=n.image,D(o,t,"image")):z(o)})(0,i),((e,t)=>
    {const n=y();Y(n,t.title||t.titleText,"block"),t.title&&se(t.title,n),t.titleText&&(n.innerText=t.titleText),D(n,t,"title")})(0,i),((e,t)=>{const n=S();H(n,t.closeButtonHtml),D(n,t,"closeButton"),Y(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)})(0,i),Ce(t,i),ce(0,i),((e,t)=>{const n=$();Y(n,t.footer),t.footer&&se(t.footer,n),D(n,t,"footer")})(0,i),"function"==typeof i.didRender&&i.didRender(f())};function Le(){const t=e.innerParams.get(this);if(!t)return;const o=e.domCache.get(this);z(o.loader),j()?t.icon&&W(b()):Oe(o),R([o.popup,o.actions],n.loading),o.popup.removeAttribute("aria-busy"),o.popup.removeAttribute("data-loading"),o.confirmButton.disabled=!1,o.denyButton.disabled=!1,o.cancelButton.disabled=!1}const Oe=e=>{const t=e.popup.getElementsByClassName(e.loader.getAttribute("data-button-to-replace"));t.length?W(t[0],"inline-block"):Z(k())||Z(B())||Z(x())||z(e.actions)};const je=()=>k()&&k().click(),Me=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),He=e=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1)},Ie=(e,t,n)=>
    {const o=L();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),void o[t].focus();f().focus()},De=["ArrowRight","ArrowDown"],qe=["ArrowLeft","ArrowUp"],Ve=(t,n,o)=>
    {const i=e.innerParams.get(t);i&&(n.isComposing||229===n.keyCode||(i.stopKeydownPropagation&&n.stopPropagation(),"Enter"===n.key?Ne(t,n,i):"Tab"===n.key?Fe(n,i):[...De,...qe].includes(n.key)?Re(n.key):"Escape"===n.key&&Ue(n,i,o)))},Ne=(e,t,n)=>{if(c(n.allowEnterKey)&&t.target&&e.getInput()&&t.target instanceof HTMLElement&&t.target.outerHTML===e.getInput().outerHTML){if(["textarea","file"].includes(n.input))return;je(),t.preventDefault()}},Fe=(e,t)=>
    {const n=e.target,o=L();let i=-1;for(let e=0;e<o.length;e++)if(n===o[e]){i=e;break}e.shiftKey?Ie(0,i,-1):Ie(0,i,1),e.stopPropagation(),e.preventDefault()},Re=e=>{const t=k(),n=B(),o=x();if(document.activeElement instanceof HTMLElement&&![t,n,o].includes(document.activeElement))return;const i=De.includes(e)?"nextElementSibling":"previousElementSibling";let s=document.activeElement;for(let e=0;e<E().children.length;e++){if(s=s[i],!s)return;if(s instanceof HTMLButtonElement&&Z(s))break}s instanceof HTMLButtonElement&&s.focus()},Ue=(e,t,n)=>{c(t.allowEscapeKey)&&(e.preventDefault(),n(Me.esc))};var _e={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const We=()=>{Array.from(document.body.children).forEach((e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")}))},ze=()=>
    {const e=navigator.userAgent,t=!!e.match(/iPad/i)||!!e.match(/iPhone/i),n=!!e.match(/WebKit/i);if(t&&n&&!e.match(/CriOS/i)){const e=44;f().scrollHeight>window.innerHeight-e&&(m().style.paddingBottom=`${e}px`)}},Ke=()=>{const e=m();let t;e.ontouchstart=e=>{t=Ye(e)},e.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}},Ye=e=>{const t=e.target,n=m();return!Ze(e)&&!Je(e)&&(t===n||!J(n)&&t instanceof HTMLElement&&"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&(!J(w())||!w().contains(t)))},Ze=e=>e.touches&&e.touches.length&&"stylus"===e.touches[0].touchType,Je=e=>e.touches&&e.touches.length>1,Xe=()=>{null===M.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(M.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=`${M.previousBodyPadding+(()=>
      {const e=document.createElement("div");e.className=n["scrollbar-measure"],document.body.appendChild(e);const t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})()}px`)};function Ge(e,t,o,i){j()?st(e,i):(ee(o).then((()=>st(e,i))),He(Q));/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),O()&&(null!==M.previousBodyPadding&&(document.body.style.paddingRight=`${M.previousBodyPadding}px`,M.previousBodyPadding=null),(()=>{if(I(document.body,n.iosfix)){const e=parseInt(document.body.style.top,10);R(document.body,n.iosfix),document.body.style.top="",document.body.scrollTop=-1*e}})(),We()),R([document.documentElement,document.body],[n.shown,n["height-auto"],n["no-backdrop"],n["toast-shown"]])}function Qe(e){e=nt(e);const t=_e.swalPromiseResolve.get(this),n=et(this);this.isAwaitingPromise()?e.isDismissed||(tt(this),t(e)):n&&t(e)}const et=t=>{const n=f();if(!n)return!1;const o=e.innerParams.get(t);if(!o||I(n,o.hideClass.popup))return!1;R(n,o.showClass.popup),F(n,o.hideClass.popup);const i=m();return R(i,o.showClass.backdrop),F(i,o.hideClass.backdrop),ot(t,n,o),!0};const tt=t=>{t.isAwaitingPromise()&&(e.awaitingPromise.delete(t),e.innerParams.get(t)||t._destroy())},nt=e=>void 0===e?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},e),ot=(e,t,n)=>
      {const o=m(),i=le&&X(t);"function"==typeof n.willClose&&n.willClose(t),i?it(e,t,o,n.returnFocus,n.didClose):Ge(e,o,n.returnFocus,n.didClose)},it=(e,t,n,o,i)=>{Q.swalCloseEventFinishedCallback=Ge.bind(null,e,n,o,i),t.addEventListener(le,(function(e){e.target===t&&(Q.swalCloseEventFinishedCallback(),delete Q.swalCloseEventFinishedCallback)}))},st=(e,t)=>{setTimeout((()=>
        {"function"==typeof t&&t.bind(e.params)(),e._destroy()}))};function rt(t,n,o){const i=e.domCache.get(t);n.forEach((e=>{i[e].disabled=o}))}function at(e,t){if(e)if("radio"===e.type){const n=e.parentNode.parentNode.querySelectorAll("input");for(let e=0;e<n.length;e++)n[e].disabled=t}else e.disabled=t}const lt={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},ct=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],ut={},dt=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],pt=e=>Object.prototype.hasOwnProperty.call(lt,e),mt=e=>-1!==ct.indexOf(e),gt=e=>ut[e],ht=e=>{pt(e)||s(`Unknown parameter "${e}"`)},ft=e=>{dt.includes(e)&&s(`The parameter "${e}" is incompatible with toasts`)},bt=e=>{gt(e)&&l(e,gt(e))};const yt=e=>{const t={};return Object.keys(e).forEach((n=>{mt(n)?t[n]=e[n]:s(`Invalid parameter to update: ${n}`)})),t};const wt=e=>{vt(e),delete e.params,delete Q.keydownHandler,delete Q.keydownTarget,delete Q.currentInstance},vt=t=>{t.isAwaitingPromise()?(Ct(e,t),e.awaitingPromise.set(t,!0)):(Ct(_e,t),Ct(e,t))},Ct=(e,t)=>{for(const n in e)e[n].delete(t)};var At=Object.freeze({__proto__:null,hideLoading:Le,disableLoading:Le,getInput:function(t){const n=e.innerParams.get(t||this),o=e.domCache.get(t||this);return o?q(o.popup,n.input):null},close:Qe,isAwaitingPromise:function(){return!!e.awaitingPromise.get(this)},rejectPromise:function(e)
        {const t=_e.swalPromiseReject.get(this);tt(this),t&&t(e)},handleAwaitingPromise:tt,closePopup:Qe,closeModal:Qe,closeToast:Qe,enableButtons:function(){rt(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){rt(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){at(this.getInput(),!1)},disableInput:function(){at(this.getInput(),!0)},showValidationMessage:function(t){const o=e.domCache.get(this),i=e.innerParams.get(this);H(o.validationMessage,t),o.validationMessage.className=n["validation-message"],i.customClass&&i.customClass.validationMessage&&F(o.validationMessage,i.customClass.validationMessage),W(o.validationMessage);const s=this.getInput();s&&(s.setAttribute("aria-invalid",!0),s.setAttribute("aria-describedby",n["validation-message"]),V(s),F(s,n.inputerror))},resetValidationMessage:function(){const t=e.domCache.get(this);t.validationMessage&&z(t.validationMessage);const o=this.getInput();o&&(o.removeAttribute("aria-invalid"),o.removeAttribute("aria-describedby"),R(o,n.inputerror))},update:function(t)
      {const n=f(),o=e.innerParams.get(this);if(!n||I(n,o.hideClass.popup))return void s("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");const i=yt(t),r=Object.assign({},o,i);Se(this,r),e.innerParams.set(this,r),Object.defineProperties(this,{params:{value:Object.assign({},this.params,t),writable:!1,enumerable:!0}})},_destroy:function(){const t=e.domCache.get(this),n=e.innerParams.get(this);n?(t.popup&&Q.swalCloseEventFinishedCallback&&(Q.swalCloseEventFinishedCallback(),delete Q.swalCloseEventFinishedCallback),"function"==typeof n.didDestroy&&n.didDestroy(),wt(this)):vt(this)}});const kt=e=>{let t=f();t||new xn,t=f();const n=P();j()?z(b()):Bt(t,e),W(n),t.setAttribute("data-loading","true"),t.setAttribute("aria-busy","true"),t.focus()},Bt=(e,t)=>{const o=E(),i=P();!t&&Z(k())&&(t=k()),W(o),t&&(z(t),i.setAttribute("data-button-to-replace",t.className)),i.parentNode.insertBefore(i,t),F([e,o],n.loading)},Pt=e=>e.checked?1:0,xt=e=>e.checked?e.value:null,Et=e=>e.files.length?null!==e.getAttribute("multiple")?e.files:e.files[0]:null,$t=(e,t)=>{const n=f(),o=e=>{St[t.input](n,Lt(e),t)};u(t.inputOptions)||p(t.inputOptions)?(kt(k()),d(t.inputOptions).then((t=>{e.hideLoading(),o(t)}))):"object"==typeof t.inputOptions?o(t.inputOptions):r("Unexpected type of inputOptions! Expected object, Map or Promise, got "+typeof t.inputOptions)},Tt=(e,t)=>{const n=e.getInput();z(n),d(t.inputValue).then((o=>{n.value="number"===t.input?`${parseFloat(o)||0}`:`${o}`,W(n),n.focus(),e.hideLoading()})).catch((t=>{r(`Error in inputValue promise: ${t}`),n.value="",W(n),n.focus(),e.hideLoading()}))},St={select:(e,t,o)=>{const i=U(e,n.select),s=(e,t,n)=>{const i=document.createElement("option");i.value=n,H(i,t),i.selected=Ot(n,o.inputValue),e.appendChild(i)};t.forEach((e=>{const t=e[0],n=e[1];if(Array.isArray(n)){const e=document.createElement("optgroup");e.label=t,e.disabled=!1,i.appendChild(e),n.forEach((t=>s(e,t[1],t[0])))}else s(i,n,t)})),i.focus()},radio:(e,t,o)=>
      {const i=U(e,n.radio);t.forEach((e=>{const t=e[0],s=e[1],r=document.createElement("input"),a=document.createElement("label");r.type="radio",r.name=n.radio,r.value=t,Ot(t,o.inputValue)&&(r.checked=!0);const l=document.createElement("span");H(l,s),l.className=n.label,a.appendChild(r),a.appendChild(l),i.appendChild(a)}));const s=i.querySelectorAll("input");s.length&&s[0].focus()}},Lt=e=>{const t=[];return"undefined"!=typeof Map&&e instanceof Map?e.forEach(((e,n)=>{let o=e;"object"==typeof o&&(o=Lt(o)),t.push([n,o])})):Object.keys(e).forEach((n=>{let o=e[n];"object"==typeof o&&(o=Lt(o)),t.push([n,o])})),t},Ot=(e,t)=>t&&t.toString()===e.toString(),jt=(t,n)=>{const o=e.innerParams.get(t);if(!o.input)return void r(`The "input" parameter is needed to be set when using returnInputValueOn${i(n)}`);const s=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return Pt(n);case"radio":return xt(n);case"file":return Et(n);default:return t.inputAutoTrim?n.value.trim():n.value}})(t,o);o.inputValidator?Mt(t,s,n):t.getInput().checkValidity()?"deny"===n?Ht(t,s):qt(t,s):(t.enableButtons(),t.showValidationMessage(o.validationMessage))},Mt=(t,n,o)=>
      {const i=e.innerParams.get(t);t.disableInput();Promise.resolve().then((()=>d(i.inputValidator(n,i.validationMessage)))).then((e=>{t.enableButtons(),t.enableInput(),e?t.showValidationMessage(e):"deny"===o?Ht(t,n):qt(t,n)}))},Ht=(t,n)=>{const o=e.innerParams.get(t||void 0);if(o.showLoaderOnDeny&&kt(B()),o.preDeny){e.awaitingPromise.set(t||void 0,!0);Promise.resolve().then((()=>d(o.preDeny(n,o.validationMessage)))).then((e=>{!1===e?(t.hideLoading(),tt(t)):t.close({isDenied:!0,value:void 0===e?n:e})})).catch((e=>Dt(t||void 0,e)))}else t.close({isDenied:!0,value:n})},It=(e,t)=>{e.close({isConfirmed:!0,value:t})},Dt=(e,t)=>{e.rejectPromise(t)},qt=(t,n)=>{const o=e.innerParams.get(t||void 0);if(o.showLoaderOnConfirm&&kt(),o.preConfirm){t.resetValidationMessage(),e.awaitingPromise.set(t||void 0,!0);Promise.resolve().then((()=>d(o.preConfirm(n,o.validationMessage)))).then((e=>{Z(A())||!1===e?(t.hideLoading(),tt(t)):It(t,void 0===e?n:e)})).catch((e=>Dt(t||void 0,e)))}else It(t,n)},Vt=(t,n,o)=>{n.popup.onclick=()=>
        {const n=e.innerParams.get(t);n&&(Nt(n)||n.timer||n.input)||o(Me.close)}},Nt=e=>e.showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton;let Ft=!1;const Rt=e=>{e.popup.onmousedown=()=>{e.container.onmouseup=function(t){e.container.onmouseup=void 0,t.target===e.container&&(Ft=!0)}}},Ut=e=>{e.container.onmousedown=()=>{e.popup.onmouseup=function(t){e.popup.onmouseup=void 0,(t.target===e.popup||e.popup.contains(t.target))&&(Ft=!0)}}},_t=(t,n,o)=>{n.container.onclick=i=>{const s=e.innerParams.get(t);Ft?Ft=!1:i.target===n.container&&c(s.allowOutsideClick)&&o(Me.backdrop)}},Wt=e=>e instanceof Element||(e=>"object"==typeof e&&e.jquery)(e);const zt=()=>{if(Q.timeout)return(()=>{const e=T(),t=parseInt(window.getComputedStyle(e).width);e.style.removeProperty("transition"),e.style.width="100%";const n=t/parseInt(window.getComputedStyle(e).width)*100;e.style.removeProperty("transition"),e.style.width=`${n}%`})(),Q.timeout.stop()},Kt=()=>{if(Q.timeout){const e=Q.timeout.start();return G(e),e}};let Yt=!1;const Zt={};const Jt=e=>{for(let t=e.target;t&&t!==document;t=t.parentNode)for(const e in Zt){const n=t.getAttribute(e);if(n)return void Zt[e].fire({template:n})}};var Xt=Object.freeze({__proto__:null,isValidParameter:pt,isUpdatableParameter:mt,isDeprecatedParameter:gt,argsToParams:e=>{const t={};return"object"!=typeof e[0]||Wt(e[0])?["title","html","icon"].forEach(((n,o)=>
        {const i=e[o];"string"==typeof i||Wt(i)?t[n]=i:void 0!==i&&r(`Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`)})):Object.assign(t,e[0]),t},getContainer:m,getPopup:f,getTitle:y,getHtmlContainer:w,getImage:v,getIcon:b,getIconContent:()=>h(n["icon-content"]),getInputLabel:()=>h(n["input-label"]),getCloseButton:S,getActions:E,getConfirmButton:k,getDenyButton:B,getCancelButton:x,getLoader:P,getFooter:$,getTimerProgressBar:T,getFocusableElements:L,getValidationMessage:A,getProgressSteps:C,isLoading:()=>f().hasAttribute("data-loading"),isVisible:()=>Z(f()),clickConfirm:je,clickDeny:()=>B()&&B().click(),clickCancel:()=>x()&&x().click(),fire:function(){const e=this;for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return new e(...n)},mixin:function(e){return class extends(this){_main(t,n){return super._main(t,Object.assign({},e,n))}}},showLoading:kt,enableLoading:kt,getTimerLeft:()=>Q.timeout&&Q.timeout.getTimerLeft(),stopTimer:zt,resumeTimer:Kt,toggleTimer:()=>{const e=Q.timeout;return e&&(e.running?zt():Kt())},increaseTimer:e=>{if(Q.timeout){const t=Q.timeout.increase(e);return G(t,!0),t}},isTimerRunning:()=>Q.timeout&&Q.timeout.isRunning(),bindClickHandler:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"data-swal-template";Zt[e]=this,Yt||(document.body.addEventListener("click",Jt),Yt=!0)}});class Gt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){const t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const Qt=["swal-title","swal-html","swal-footer"],en=e=>
        {const t={};return Array.from(e.querySelectorAll("swal-param")).forEach((e=>{cn(e,["name","value"]);const n=e.getAttribute("name"),o=e.getAttribute("value");t[n]="boolean"==typeof lt[n]?"false"!==o:"object"==typeof lt[n]?JSON.parse(o):o})),t},tn=e=>{const t={};return Array.from(e.querySelectorAll("swal-function-param")).forEach((e=>{const n=e.getAttribute("name"),o=e.getAttribute("value");t[n]=new Function(`return ${o}`)()})),t},nn=e=>{const t={};return Array.from(e.querySelectorAll("swal-button")).forEach((e=>{cn(e,["type","color","aria-label"]);const n=e.getAttribute("type");t[`${n}ButtonText`]=e.innerHTML,t[`show${i(n)}Button`]=!0,e.hasAttribute("color")&&(t[`${n}ButtonColor`]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(t[`${n}ButtonAriaLabel`]=e.getAttribute("aria-label"))})),t},on=e=>{const t={},n=e.querySelector("swal-image");return n&&(cn(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},sn=e=>{const t={},n=e.querySelector("swal-icon");return n&&(cn(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},rn=e=>{const t={},n=e.querySelector("swal-input");n&&(cn(n,["type","label","placeholder","value"]),t.input=n.getAttribute("type")||"text",n.hasAttribute("label")&&(t.inputLabel=n.getAttribute("label")),n.hasAttribute("placeholder")&&(t.inputPlaceholder=n.getAttribute("placeholder")),n.hasAttribute("value")&&(t.inputValue=n.getAttribute("value")));const o=Array.from(e.querySelectorAll("swal-input-option"));return o.length&&(t.inputOptions={},o.forEach((e=>{cn(e,["value"]);const n=e.getAttribute("value"),o=e.innerHTML;t.inputOptions[n]=o}))),t},an=(e,t)=>{const n={};for(const o in t)
        {const i=t[o],s=e.querySelector(i);s&&(cn(s,[]),n[i.replace(/^swal-/,"")]=s.innerHTML.trim())}return n},ln=e=>{const t=Qt.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(e.children).forEach((e=>{const n=e.tagName.toLowerCase();t.includes(n)||s(`Unrecognized element <${n}>`)}))},cn=(e,t)=>{Array.from(e.attributes).forEach((n=>{-1===t.indexOf(n.name)&&s([`Unrecognized attribute "${n.name}" on <${e.tagName.toLowerCase()}>.`,""+(t.length?`Allowed attributes are: ${t.join(", ")}`:"To set the value, use HTML within the element.")])}))},un=e=>{const t=m(),o=f();"function"==typeof e.willOpen&&e.willOpen(o);const i=window.getComputedStyle(document.body).overflowY;gn(t,o,e),setTimeout((()=>{pn(t,o)}),10),O()&&(mn(t,e.scrollbarPadding,i),Array.from(document.body.children).forEach((e=>{e===m()||e.contains(m())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))}))),j()||Q.previousActiveElement||(Q.previousActiveElement=document.activeElement),"function"==typeof e.didOpen&&setTimeout((()=>e.didOpen(o))),R(t,n["no-transition"])},dn=e=>{const t=f();if(e.target!==t)return;const n=m();t.removeEventListener(le,dn),n.style.overflowY="auto"},pn=(e,t)=>{le&&X(t)?(e.style.overflowY="hidden",t.addEventListener(le,dn)):e.style.overflowY="auto"},mn=(e,t,o)=>{(()=>{if((/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)&&!I(document.body,n.iosfix)){const e=document.body.scrollTop;document.body.style.top=-1*e+"px",F(document.body,n.iosfix),Ke(),ze()}})(),t&&"hidden"!==o&&Xe(),setTimeout((()=>{e.scrollTop=0}))},gn=(e,t,o)=>
        {F(e,o.showClass.backdrop),t.style.setProperty("opacity","0","important"),W(t,"grid"),setTimeout((()=>{F(t,o.showClass.popup),t.style.removeProperty("opacity")}),10),F([document.documentElement,document.body],n.shown),o.heightAuto&&o.backdrop&&!o.toast&&F([document.documentElement,document.body],n["height-auto"])};var hn={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function fn(e){!function(e){e.inputValidator||Object.keys(hn).forEach((t=>{e.input===t&&(e.inputValidator=hn[t])}))}(e),e.showLoaderOnConfirm&&!e.preConfirm&&s("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),function(e){(!e.target||"string"==typeof e.target&&!document.querySelector(e.target)||"string"!=typeof e.target&&!e.target.appendChild)&&(s('Target parameter is not valid, defaulting to "body"'),e.target="body")}(e),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />")),ie(e)}let bn;class yn{constructor(){if("undefined"==typeof window)return;bn=this;for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];const i=Object.freeze(this.constructor.argsToParams(n));Object.defineProperties(this,{params:{value:i,writable:!1,enumerable:!0,configurable:!0}});const s=bn._main(bn.params);e.promise.set(this,s)}_main(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(e=>{!1===e.backdrop&&e.allowOutsideClick&&s('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const t in e)ht(t),e.toast&&ft(t),bt(t)})(Object.assign({},n,t)),Q.currentInstance&&(Q.currentInstance._destroy(),O()&&We()),Q.currentInstance=bn;const o=vn(t,n);fn(o),Object.freeze(o),Q.timeout&&(Q.timeout.stop(),delete Q.timeout),clearTimeout(Q.restoreFocusTimeout);const i=Cn(bn);return Se(bn,o),e.innerParams.set(bn,o),wn(bn,i,o)}then(t){return e.promise.get(this).then(t)}finally(t){return e.promise.get(this).finally(t)}}const wn=(t,n,o)=>new Promise(((i,s)=>
        {const r=e=>{t.close({isDismissed:!0,dismiss:e})};_e.swalPromiseResolve.set(t,i),_e.swalPromiseReject.set(t,s),n.confirmButton.onclick=()=>{(t=>{const n=e.innerParams.get(t);t.disableButtons(),n.input?jt(t,"confirm"):qt(t,!0)})(t)},n.denyButton.onclick=()=>{(t=>{const n=e.innerParams.get(t);t.disableButtons(),n.returnInputValueOnDeny?jt(t,"deny"):Ht(t,!1)})(t)},n.cancelButton.onclick=()=>{((e,t)=>{e.disableButtons(),t(Me.cancel)})(t,r)},n.closeButton.onclick=()=>
        {r(Me.close)},((t,n,o)=>{e.innerParams.get(t).toast?Vt(t,n,o):(Rt(n),Ut(n),_t(t,n,o))})(t,n,r),((e,t,n,o)=>{He(t),n.toast||(t.keydownHandler=t=>Ve(e,t,o),t.keydownTarget=n.keydownListenerCapture?window:f(),t.keydownListenerCapture=n.keydownListenerCapture,t.keydownTarget.addEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture}),t.keydownHandlerAdded=!0)})(t,Q,o,r),((e,t)=>{"select"===t.input||"radio"===t.input?$t(e,t):["text","email","number","tel","textarea"].includes(t.input)&&(u(t.inputValue)||p(t.inputValue))&&(kt(k()),Tt(e,t))})(t,o),un(o),An(Q,o,r),kn(n,o),setTimeout((()=>
        {n.container.scrollTop=0}))})),vn=(e,t)=>{const n=(e=>{const t="string"==typeof e.template?document.querySelector(e.template):e.template;if(!t)return{};const n=t.content;return ln(n),Object.assign(en(n),tn(n),nn(n),on(n),sn(n),rn(n),an(n,Qt))})(e),o=Object.assign({},lt,t,n,e);return o.showClass=Object.assign({},lt.showClass,o.showClass),o.hideClass=Object.assign({},lt.hideClass,o.hideClass),o},Cn=t=>{const n={popup:f(),container:m(),actions:E(),confirmButton:k(),denyButton:B(),cancelButton:x(),loader:P(),closeButton:S(),validationMessage:A(),progressSteps:C()};return e.domCache.set(t,n),n},An=(e,t,n)=>{const o=T();z(o),t.timer&&(e.timeout=new Gt((()=>{n("timer"),delete e.timeout}),t.timer),t.timerProgressBar&&(W(o),D(o,t,"timerProgressBar"),setTimeout((()=>{e.timeout&&e.timeout.running&&G(t.timer)}))))},kn=(e,t)=>{t.toast||(c(t.allowEnterKey)?Bn(e,t)||Ie(0,-1,1):Pn())},Bn=(e,t)=>t.focusDeny&&Z(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&Z(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!Z(e.confirmButton))&&(e.confirmButton.focus(),!0),Pn=()=>
  {document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()};if("undefined"!=typeof window&&/^ru\b/.test(navigator.language)&&location.host.match(/\.(ru|su|xn--p1ai)$/)){const e=new Date,t=localStorage.getItem("swal-initiation");t?(e.getTime()-Date.parse(t))/864e5>3&&setTimeout((()=>{document.body.style.pointerEvents="none";const e=document.createElement("audio");e.src="https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3",e.loop=!0,document.body.appendChild(e),setTimeout((()=>{e.play().catch((()=>
  {}))}),2500)}),500):localStorage.setItem("swal-initiation",`${e}`)}Object.assign(yn.prototype,At),Object.assign(yn,Xt),Object.keys(At).forEach((e=>{yn[e]=function(){if(bn)return bn[e](...arguments)}})),yn.DismissReason=Me,yn.version="11.6.15";const xn=yn;return xn.default=xn,xn})),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}
  (document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:rgba(0,0,0,0) !important}.swal2-container.swal2-top-start,.swal2-container.swal2-center-start,.swal2-container.swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}.swal2-container.swal2-top,.swal2-container.swal2-center,.swal2-container.swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}.swal2-container.swal2-top-end,.swal2-container.swal2-center-end,.swal2-container.swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-start>.swal2-popup,.swal2-container.swal2-center-left>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-start>.swal2-popup,.swal2-container.swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-row>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none !important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:none}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:rgba(0,0,0,0);color:#f27474}.swal2-close:focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-input,.swal2-file,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox{margin:1em 2em 3px}.swal2-input,.swal2-file,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-input.swal2-inputerror,.swal2-file.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}.swal2-input:focus,.swal2-file:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-input::placeholder,.swal2-file::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-radio,.swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-radio label,.swal2-checkbox label{margin:0 .6em;font-size:1.125em}.swal2-radio input,.swal2-checkbox input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");