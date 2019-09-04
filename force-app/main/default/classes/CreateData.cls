public class CreateData {
    //CreateData.CreateLocations();

    private static Photo__c getPhoto(String name, Decimal lat, Decimal lng, String resourceName, String description, String orientation, String countryTip) {
        Photo__c p = new Photo__c();
        p.Name = name;
        p.location__latitude__s = lat;
        p.location__longitude__s  = lng;
        p.description__c = description;
        p.staticResourceName__c = resourceName;
        p.Orientation__c = orientation;
        p.CountryTip__c = countryTip;
        return p;
    }

    public static void CreateLocations() {
        
        delete[SELECT Id from Photo__c];
        
        List<Photo__c> photos = new List<Photo__c>();
        
        photos.add(
            getPhoto('London, United Kingdom', 
                    51.5007, 
                    -0.1246, 
                    'Astro_London.jpg', 
                    'Hello, London Bridge!',
                    'portrait',
                    ''
            )
        );

        photos.add(
            getPhoto('Amsterdam, The Netherlands', 
                    52.3667, 
                    4.8945, 
                    'Astro_Amsterdam.jpg', 
                    'Astro loves visiting Amsterdam and making new Dutch friends.',
                    'portrait',
                    ''
            )
        );

         photos.add(
            getPhoto('Marrakesh, Morocco', 
                    31.6295, 
                    -7.9811, 
                    'Astro_Marrakesh.jpg', 
                    'Astro checks out the Koutoubia Mosque in Marrakesh.',
                    'portrait',
                    ''

            )
        );

        photos.add(
            getPhoto('Valletta, Malta', 
                    35.9375, 
                    14.3754, 
                    'Astro_Malta.jpg', 
                    'Astro at dusk in Malta ',
                    'landscape',
                    ''
            )
        );

        photos.add(
            getPhoto('Niagara Falls, Canada', 
                    43.0962, 
                    -79.0377, 
                    'Astro_NiagaraFalls.jpg', 
                    'Astro can swim, but hopefully he won\'t need to!',
                    'landscape',
                    ''
            )
        );

        photos.add(
            getPhoto('Giza, Egypt', 
                    30.0131, 
                    31.2089, 
                    'Astro_Giza.jpg', 
                    'Astro loves getting sun in the desert!',
                    'portrait',
                    ''
            )
        );

        insert photos;

    }
   
}
