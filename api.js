async function movie(){
    try {

        let header=document.createElement("div");
        header.className="header_container";
        
        let headimage=document.createElement("div");
        headimage.className="head_image";
        headimage.innerHTML=`<img src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg 959w" alt="" aria-hidden="true" class="default-ltr-cache-19j6xtr">`
        header.append(headimage);
         
         let nav=document.createElement("div");
         nav.className="nav_container";
         header.append(nav);

         let navtext=document.createElement("h3");
         navtext.className="navtext";
         navtext.innerText="NETFLIX"
         nav.append(navtext);

         let signin=document.createElement("button");
         signin.className="signin";
         signin.innerText="Sign In";
         nav.append(signin);

         let headtext=document.createElement("div");
         headtext.className="headtext";
         header.append(headtext);

         let text1=document.createElement("h2");
         text1.innerText="Unlimited movies, TV shows and more";
         headtext.append(text1);
         
        let text2=document.createElement("h4");
        text2.innerText="Starts at ₹149. Cancel anytime.";
        headtext.append(text2);

        let text3=document.createElement("h5");
        text3.innerText="Ready to watch? Enter your email to create or restart your membership.";
        headtext.append(text3);

        
         

         let search_container=document.createElement("div");
         search_container.className="search_container";
         header.append(search_container);

         let search=document.createElement("input");
         search.type="search";
         search.placeholder="Search The Movie Name";
         search.className="search";
         search_container.append(search);

         let search_button=document.createElement("button");
         search_button.innerText="search";
         search_container.append(search_button);

         let loader=document.createElement("div");
         loader.className="loader"
         loader.style.display="none";
         search_container.append(loader);

        let main=document.createElement("div");
        main.className="main_container";
        document.body.prepend(main);
        document.body.prepend(header);

        let notfound=document.createElement("h3")
        notfound.className="notfound"

        let timing;
      

        async function search_movie() {
            try{

                loader.style.display="block";
                let value=document.querySelector(".search").value;

                if(value.trim()===""){
                    loader.style.display="none";
                    notfound.innerText="";
                    main.innerHTML=" ";
                    return;
                }

                let api=await fetch(`http://www.omdbapi.com/?s=${value}&page=3&apikey=891606f7`);
                api=await api.json();
                console.log(api);
                

                if (api.Response==="False") {
                    notfound.innerText="Oops! Movie you Have Entered Is Not Found.  ";
                    main.innerHTML=" ";
                    main.append(notfound);
                    return;
                }else{
                    notfound.innerText=""
                }

                api.Search.map((data)=>{

                    let card=document.createElement("div");
                    card.className="card_container";
                    main.append(card);
            
                    let title=document.createElement("div");
                    title.className="title_container";
                     title.innerHTML=`<h3>${data.Title}</h3>`
                    card.append(title);
            
            
                    let image=document.createElement("div");
                    image.className="image_container";
                    image.innerHTML=`<img src=${data.Poster ==="N/A"?"https://dbsamoa.ws/wp-content/uploads/2022/08/Not-available.jpg":data.Poster}>`
                    card.append(image);
            
                    let description=document.createElement("div");
                    description.className="description_container";
                    description.innerHTML=
                    `<h4>${data.Type}</h4>
                    <h4>${data.Year}</h4>`
                    card.append(description);
                })
            }
            catch(error){
                console.log(error.message)
                
            }
            finally{
                loader.style.display="none";
            }
        
            
        } 

        function inputtimer(){
            clearTimeout(timing);
            timing= setTimeout(search_movie,1000);
        }

        search.addEventListener("input",inputtimer);
        search_button.addEventListener("click",search_movie);
        
    }    
    catch(error) {
        console.log(error.message);
                    
                    
    }

    
}movie();    
