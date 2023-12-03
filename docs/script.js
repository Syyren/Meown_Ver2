$(document).ready(function(){
    $('.slider').bxSlider({
        mode: 'fade',
        pager: false,
    });
});

lightbox.option({
       'wrapAround': true,
       'albumLabel': ""
});
//made a button to change between the pet groomers, hotel, and day camps.
function changeView() {
    var a = '#ui-grid-a'
    var b = '#pethotel'
    var c = '#petcamp'
    var title = '#service_title'
    if ($(a).is(':visible'))
    {
        $(a).hide();
        $(b).show();
    }
    else if ($(b).is(':visible'))
    {
        $(b).hide();
        $(c).show();
    }
    else
    {
        $(c).hide();
        $(a).show();
    }
};

$(document).ready(function()
{
    var i = 1;
    const COLS = 3;
    $.getJSON('docs/services.json', function(data)
    {
        $.each(data.groomers, function(_, groomer)
        {
            var post = '#groomers' + i
            $(post).append(
                '<strong>Name: </strong>' + groomer.name + '<br>' +
                '<strong>Location: </strong>' + groomer.location + '<br>' +
                '<strong>Bio: </strong>' + groomer.bio + '<br>' +
                '<img src="' + groomer.image + '"alt="' + groomer.alt + '"></img><br><br>'
            )
            i ++;
            if (i == COLS)
            {
                i = 1
            };
        });
    });
});

$(document).ready(function () {
    var i = 1;
    $.ajax({type: "GET", url: "docs/services.xml", dataType: "xml", success: function (xml) 
    {
            $(xml).find('pethotel').each(function () 
            {
                var name = $(this).find('name').text();
                var location = $(this).find('location').text();
                var bio = $(this).find('bio').text();
                var image = $(this).find('image').text();
                var alt = $(this).find('alt').text();
                var collapsibleContent = '<div data-role="collapsible">' +
                    '<h3>' + name + '</h3>' +
                    '<p><strong>Name: </strong>' + name + '<br>' +
                    '<p><strong>Location: </strong>' + location + '<br>' +
                    '<p><strong>Bio: </strong>' + bio + '</p>' +
                    '<img src="' + image + '" alt="' + alt + '"></img>' +
                    '</div>';
                $('#pethotel').append(collapsibleContent);
            });
            $('#pethotel div[data-role="collapsible"]').collapsible().trigger('create');
        },
        error: function (_, _, error) 
        {
            console.error("Error loading XML file:", error);
        }
    });
});

