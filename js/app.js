window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1/',
    REQ_URL: 'https://www.instagram.com/oauth/authorize/?client_id={1}&redirect_uri=http://127.0.0.1:3000&response_type=token&scope=basic+public_content+follower_list+relationships+likes',

    init: function( opt ) {
        opt = opt || {};
        this.config.access_token = opt.access_token;
        this.config.client_id = opt.client_id;
    },

    /**
     * Get a list of recently tagged media.
     */
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + 'tags/' + name + '/media/recent?access_token=' + this.config.access_token;
        this.getJSON( endpoint, callback );
    },

    getJSON: function( url, callback ) {
        console.log('GET: ' + url);
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    },

    reqByURL: function( url, callback ) {
        var endpoint = url.replace('ACCESS-TOKEN', this.config.access_token);
        this.getJSON( endpoint, callback );
    }
};

Instagram.init({
    access_token: '5434730030.3acff82.9eea3624929e41a4a4f0fd87d8f2e90f',
    client_id: '3acff82e1d91465286cf863783f38d6d'
});


$( document ).ready(function() {
    $( '#form2' ).on('submit', function( e ) {
        e.preventDefault();
        var url = $( '#search2' ).val();
        Instagram.reqByURL( url, (r) => {
            console.log(r);
        });
    });

    // Instagram.popular(function( response ) {
    //     var $instagram = $( '#instagram' );
    //     for ( var i = 0; i < response.data.length; i++ ) {
    //         imageUrl = response.data[i].images.low_resolution.url;
    //         $instagram.append( '<img src="' + imageUrl + '" />' );
    //     }
    // });

    $( '#form1' ).on('submit', function( e ) {
        e.preventDefault();
        var tagName = $( '#search1' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');
            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
                $instagram.append( '<img src="' + imageUrl + '" />' );
            }
        });
    });

});