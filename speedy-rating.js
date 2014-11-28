
(function($){

    var defaults = {
        html_on:'',
        html_off:''
    };

    var _els = [];

    $.fn.SpeedyRating = function(settings)
    {
        settings = settings || {};
        var n_settings = $.extend({},defaults,settings);
        setup($(this),n_settings);
    };

    function getAttr(object,attr)
    {
        var rattr = object.attr(attr);
        return (typeof rattr == "undefined") ? '' : rattr;
    }

    function applyDataSettings(object,settings)
    {
        for (var p in defaults)
        {
            if (defaults.hasOwnProperty(p))
            {
                var attr = getAttr(object,'data-'+ p.toLowerCase());
                if (attr)
                {
                    settings[p] = attr;
                }
            }
        }
    }

    function _new(originobject,settings)
    {
        settings.elid = _els.length;
        _els.push({originobject:originobject,settings:settings,object:false,setrating:0});
        return settings.elid;
    }

    function displayRating(settings,object,rating)
    {
        if (settings && object && object.length && rating && rating >= 1 && rating <= 5)
        {
            for (var j=1; j<=rating; j++)
            {
                object.find('.speedy-rating-star[data-rating="'+j+'"]').addClass('speedy-rating-star-on').html(settings.html_on);
            }

            for (var k=5; k>rating; k--)
            {
                object.find('.speedy-rating-star[data-rating="'+k+'"]').removeClass('speedy-rating-star-on').html(settings.html_off);
            }
        }
    }

    function getSelectOption(select,value)
    {
        if (select && select.length && value)
        {
            var option = false;
            var options = select.find('option');
            options.each(function(){
                if (option === false)
                {
                    var _this = $(this);
                    var _value = _this.attr('value');
                    var _text = _this.text();

                    if (_value && _value == value)
                    {
                        option = _this;
                    }
                    else if (_text && _text == value)
                    {
                        option = _this;
                    }
                }
            });

            return option;
        }
        return false;
    }

    function create(originobject,settings)
    {
        var elid = _new(originobject,settings);
        var error = false;

        var html = '<div class="speedy-rating" data-elid="'+elid+'">';
        for (var i=1; i<=5; i++)
        {
            var op = getSelectOption(originobject,i);
            if (op.length)
            {
                html += '<div class="speedy-rating-star speedy-rating-star-'+i+'" data-rating="'+i+'">'+settings.html_off+'</div>';
            }
            else
            {
                error = true;
                break;
            }
        }
        html += '</div>';

        if (!error)
        {
            originobject.after(html).hide();

            var object = $('.speedy-rating[data-elid="'+elid+'"]');
            var last_hit = false;

            if (object.length)
            {
                object.find('.speedy-rating-star').on('mouseenter',function(){
                    if (last_hit != this)
                    {
                        last_hit = this;
                        var _this = $(this);
                        var _rating = parseInt(_this.attr('data-rating'));

                        if (_rating && _rating <= 5 && _rating >= 1)
                        {
                            displayRating(settings,object,_rating);
                        }
                    }
                    return false;
                }).on('click',function(){
                    var _this = $(this);
                    var _rating = parseInt(_this.attr('data-rating'));
                    if (_rating)
                    {
                        var _option = getSelectOption(originobject,_rating);

                        if (_option && _option.length)
                        {
                            // set rating and set select
                            _els[elid].setrating = _rating;
                            originobject.find('option').attr('selected',false);
                            _option.attr('selected',true);
                            originobject.change();
                        }
                    }
                });

                object.on('mouseleave',function(){
                    var _this = $(this);
                    var _rating = _els[elid].setrating;

                    if (_rating >=1 && _rating <= 5)
                    {
                        displayRating(settings,_this,_rating);
                    }
                    else
                    {
                        _this.find('.speedy-rating-star').removeClass('speedy-rating-star-on').html(settings.html_off);
                    }

                    last_hit = false;
                });

                //check if value loaded
                var start_rating = originobject.val();
                if (start_rating && start_rating >= 1 && start_rating <= 5)
                {
                    displayRating(settings,object,start_rating);
                    _els[elid].setrating = start_rating;
                }

                _els[elid].object = object;
            }
        }
    }

    function setup(objects,settings)
    {
        if (objects.length > 0)
        {
            objects.each(function(){
                var originobject = $(this);
                var t_settings = $.extend({},settings);

                applyDataSettings(originobject,t_settings);

                create(originobject,t_settings);
            });
        }
    }

    $('select.speedy-rating').SpeedyRating();

})(jQuery);
