/*eslint-env browser*/
/*global $*/


// FUNCTIONS
function scrollTo(selector) {
    'use strict';

    $(selector).show().get(0).scrollIntoView({
        behavior: 'smooth'
    });
}

function resetOtherDonation() {
    'use strict';

    $('#other-destinations').hide();
    $('#destination').get(0).selectedIndex = 0;
}

function resetCurrency() {
    'use strict';

    // Hide currency
    $('#donation-currency').hide();

    // Remove currency sign
    $('.currency').attr('class', function (i, c) {
        return c.replace(/(^|\s)curr-\S+/g, '');
    });

    $('.currency').addClass('curr-EUR');

    // Select defaut currency (EUR)
    $('#currency').get(0).selectedIndex = 1;
}

function resetDonation() {
    'use strict';

    // Unselect destination
    $('[id^=big-bucket-]').removeClass('button-primary');

    // Select default destination
    $('#big-bucket-1').addClass('button-primary');

    // Unselect amount
    $('[id^=amount-]').removeClass('button-primary');

    // Reset Other Donation
    resetOtherDonation();

    // Reset Currency
    resetCurrency();
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
    $('[id^=country-]').click(
        function () {
            var attribute = $(this).attr('id');

            // Unselect buttons
            $('[id^=country-]').not(this).each(
                function () {
                    $(this).removeClass('button-primary');
                }
            );


            // Select clicked button
            $(this).addClass('button-primary');

            // Reset destination
            resetDonation();

            if (attribute === 'country-other') {
                // Reset currency
                resetCurrency();

                // Go to donation amount
                $('#donation-currency').show();

                scrollTo('#donation');

            } else if (attribute === 'country-be') {
                document.location.href = 'https://www.kbs-frb.be/en/Flows/Gift/Checkout?notice=TGE-FR-Insead&title=Insead';

            } else if (attribute === 'country-de') {
                document.location.href = 'https://secure.spendenbank.de/form/1941/';

            } else {
                if (attribute === 'country-uk') {
                    $('#gift-aid').show();
                } else {
                    $('#gift-aid').hide();
                }

                $('.currency').attr('class', function (i, c) {
                    return c.replace(/(^|\s)curr-\S+/g, '');
                });

                $('.currency').addClass('curr-' + $(this).attr('country'));

                scrollTo('#donation');
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

            resetOtherDonation();

            if ($(this).attr('id') === 'big-bucket-other') {
                $('#other-destinations').show();
            } else {
                $('#other-destinations').hide();

                scrollTo('#donation-amount');
            }
        }
    );

    $('#destination').change(
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
