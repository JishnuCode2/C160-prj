AFRAME.registerComponent("place-side-view", {
    schema:{
        state: {type: 'string', default: 'view'}
    },

    createPlaceThumbNails: function(position, id){
       const entityEl = document.createElement("a-entity");
       const placeNames= ["park", "lake", "houses", "street"]
  
       entityEl.setAttribute("visible", true);
       entityEl.setAttribute("id", `${placeNames[id-1]}`);
  
       entityEl.setAttribute("geometry", {
         primitive: "circle",
         radius: 2.6,
       });
  
       entityEl.setAttribute("material", {
         src: "./arrow-gc2803e44e_1280.png",
         opacity: 0.9
       });

       entityEl.setAttribute("scale", {x:0.2, y:0.2, z:1})
  
       entityEl.setAttribute("position", position);
  
       return entityEl;
    },

    createPlaceName: function(position,id){
        const entityEl = document.createElement("a-entity")
        const placeNames= ["Park", "Lake", "Houses", "Street"]
        const pos = {x:position.x, y:position.y + 0.8, z:position.z}

        entityEl.setAttribute("position", pos)
        entityEl.setAttribute("text",{
            font: "exo2bold" ,
            align: "center",
            width: "10",
            color: "#fff", 
            value: `${placeNames[id-1]}`
        });
        entityEl.setAttribute("id", `text-${id}`)
        return entityEl
    },
  
    createPlaces: function(){
      const sideViewContainer = document.querySelector(
        "#side-view-container"
      );
      let previousXPosition = -12.5;
      let previousYPosition = 3;
  
      for(var i=1; i<=4; i++){
        const position ={
          x: (previousXPosition += 5),
          y: (previousYPosition),
          z: -10
        };

        const entityEl = this.createPlaceThumbNails(position, i);
        const text = this.createPlaceName(position, i)
        sideViewContainer.appendChild(entityEl);
        sideViewContainer.appendChild(text);
      }
    },

    onPress: function(){
      const cursor = document.querySelector("#cursor")
      cursor.addEventListener("click", (e)=>{
        const el = e.detail.intersectedEl
        const id = el.getAttribute("id")
        const isVisible= el.getAttribute("visible")
        if(id != "back-button"){
          const skyEl = document.querySelector("#main-container")
          skyEl.setAttribute("src", `./${id}.jpg`)
          this.data.state = id  
        }else{
          this.data.state = 'view'
        }
      })
    },

    init: function(){
      this.createPlaces();
      this.onPress();
    },
    tick: function(){
      const {state} = this.data
      const loc = document.querySelector("#loc");
      const back = document.querySelector("#back")
      const sky = document.querySelector("#main-container")

      if(state === 'view'){
        this.el.setAttribute("visible", true)

        loc.setAttribute("visible", true)

        back.setAttribute("visible", false)
        sky.setAttribute("src", "./main.jpg")
      }else{
        this.el.setAttribute("visible", false)

        loc.setAttribute("visible", false)

        back.setAttribute("visible", true)
      }
    }
  });
  