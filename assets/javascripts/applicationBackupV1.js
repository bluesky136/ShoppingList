MyShopList = new Backbone.Marionette.Application(); //Starting a Backbone.Marionette application
													//Using Backbone to build RESTful JavaScript app
MyShopList.addRegions({
	mainRegion: "#content" //using a DOM element with id "content" to fill the shopping list.
							//Will include inside the index.html element "content".
							//**Backbone.sync eg: objectName.save() and the JSON of that object will be sent to server.
});

Orchid = Backbone.Model.extend({
						//currently this object has empty with "{}". Need to provide javascript later for this object.
}); 

OrchidCollection = Backbone.Collection.extend({
	model: Orchid 			//Pretty much like java array in declaring the type of object it will store.
});

OrchidView = Backbone.Marionette.ItemView.extend({ //Marionette already helps with the render method. Hence it is not needed. So all that is
	template: "#orchid-template", // needed is to create the Single View to display the object; eg an instance of an Orchid.
	tagName: 'tr', //Backbone plain vanilla tag render is a "div". In this case we should use "tr" tag to be generated as a DOM element instead.
	className: 'orchid_tagName' // **tagName is IMPORTANT!
	
});

OrchidCollectionView = Backbone.Marionette.CompositeView.extend({ //Going to create a view to show a collection of Orchids("itemView").
	tagName: "table",											//Define same as "itemView" but with addition appendHtml function to tell where. eg body
	id: "orchid_collection",
	className: "table-striped table-bordered",
	template: "#orchid_collection-template",
	itemView: OrchidView,
	
	appendHtml: function(collectionView, itemView){ //Dumping the compositeView into the "tbody"
		collectionView.$("tbody").append(itemView.el);
	}
});

//***TIME to start this app! Using "Initializer" as helper

MyShopList.addInitializer(function(options){
	var anOrchidCollectionView = new OrchidCollectionView({
		collection: options.orchids
	});
	
	MyShopList.mainRegion.show(anOrchidCollectionView);
	
});

$(document).ready(function(){
	var orchids = new OrchidCollection([ //Declaring variables to each object
	 new Orchid({ name: 'Bleeding Heart', image_path: 'assets/images/1.jpg' }),
	 new Orchid({ name: 'Dragon flower' }),
	 new Orchid({ name: 'Clarisse Austin(Best Pink)' })
	]);
	
	MyShopList.start({orchids:orchids});
});