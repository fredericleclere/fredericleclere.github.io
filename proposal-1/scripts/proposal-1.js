/*eslint-env browser*/
/*global $*/

// FUNCTIONS
function scrollTo(selector) {
    'use strict';

    $(selector).show();
    $(selector).get(0).scrollIntoView({
        behavior: 'smooth'
    });
}

function clearTaxRelief() {
    'use strict';

    $('#gift-aid').hide();
    $('#country').get(0).selectedIndex = 0;
}

function clearDonation() {
    'use strict';

    $('[id^=big-bucket-]').removeClass('button-primary');
    $('[id^=amount-]').removeClass('button-primary');


    $('.currency').attr('class', function (i, c) {
        return c.replace(/(^|\s)curr-\S+/g, '');
    });
}

function clearOtherDonation() {
    'use strict';

    $('#other-destinations').hide();
    $('#destination').get(0).selectedIndex = 0;
}

function updateCommitment() {
    'use strict';

    var amount = 0,
        frequency = $('#frequency').val(),
        duration = $('#duration').val(),
        total = 0;

    if ($('#other-amount').val() !== '') {
        if ($.isNumeric($('#other-amount').val())) {
            amount = $('#other-amount').val();
        }
    } else {
        amount = $('[id^=amount-].button-primary').attr('amount');
    }

    total = amount * frequency * duration;
    if (total === 0) {
        $('#commitment').html('0');
    } else {
        $('#commitment').html((total).toLocaleString('en-US'));

        scrollTo('#personal-information');
    }
}

// BEGIN
$(document).ready(function () {
    'use strict';

    // Tax Relief
    $('[id^=tax-receipt-]').click(
        function () {
            $('[id^=tax-receipt-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );

            $(this).addClass('button-primary');

            clearTaxRelief();
            clearDonation();

            if ($(this).attr('id') === 'tax-receipt-yes') {
                scrollTo('#tax-relief');
                $('#donation-currency').hide();
            } else {
                $('#tax-relief').hide();
                $('#donation-amount').hide();
                $('#donation-currency').show();

                scrollTo('#donation-destination');
            }
        }
    );

    $('#country').change(
        function () {
            if ($(this).val() === 'UK') {
                $('#gift-aid').show();
            } else {
                $('#gift-aid').hide();
            }

            switch ($(this).val()) {
                case 'NONE':
                    break;

                case 'DE':
                    //
                    break;

                case 'BE':
                    //

                    break;

                default:
                    $('.currency').attr('class', function (i, c) {
                        return c.replace(/(^|\s)curr-\S+/g, '');
                    });

                    $('.currency').addClass('curr-' + $(this).val());

                    scrollTo('#donation-destination');
            }
        }
    );

    // Donation Destination
    $('[id^=big-bucket-]').click(
        function () {
            $('[id^=big-bucket-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );

            $(this).addClass('button-primary');


            if ($(this).attr('id') === 'big-bucket-other') {
                $('#other-destinations').show();
            } else {
                $('#other-destinations').hide();
                clearOtherDonation();

                scrollTo('#donation-amount');
            }
        }
    );

    $('#destination').click(
        function () {
            if ($(this).val() !== '') {
                scrollTo('#donation-amount');
            }
        }
    );

    // Donation Amount
    $('[id^=amount-]').click(
        function () {
            $('[id^=amount-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );

            $(this).addClass('button-primary');

            $('#other-amount').val('');

            $('[id^=give-]').attr('disabled', false);

            updateCommitment();

            scrollTo('#giving-options');
        }
    );

    $('#other-amount').focusin(
        function () {
            $('[id^=amount-]').removeClass('button-primary');


            $('[id^=give-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );

            if ($.isNumeric($(this).val())) {
                $('[id^=give-]').attr("disabled", false);
            } else {
                $('[id^=give-]').attr("disabled", true);
            }
        }
    );

    $('#other-amount').keyup(
        function () {
            if ($.isNumeric($(this).val())) {
                $('[id^=give-]').attr('disabled', false);
                updateCommitment();
            }
        }
    );

    $('#other-amount').focusout(
        function () {
            if ($.isNumeric($(this).val())) {
                $('[id^=give-]').attr('disabled', false);

                scrollTo('#giving-options');
            }
        }
    );

    $('#currency').change(
        function () {
            $('.currency').attr('class', function (i, c) {
                return c.replace(/(^|\s)curr-\S+/g, '');
            });

            $('.currency').addClass('curr-' + $(this).val());
        }
    );

    $('[id^=give-]').click(
        function () {
            $('[id^=give-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );

            $(this).addClass('button-primary');

            if ($(this).attr('id') === 'give-regularly') {
                $('#direct-debit').show();

                scrollTo('#giving-options');

            } else {
                $('#direct-debit').hide();

                scrollTo('#personal-information');
            }
        }
    );

    $('#frequency').change(
        function () {
            updateCommitment();
        }
    );

    $('#duration').change(
        function () {
            updateCommitment();
        }
    );

    $('#email').keyup(
        function () {
            if ($(this).val() === 'jane.doe@insead.edu') {
                $('#alumni').html("Hey Jane, you're a rockstar. Thank you for your outstanding support!");
            } else {
                $('#alumni').html("We've never met before but we can have a coffee or something.");
            }
        }
    );
});
