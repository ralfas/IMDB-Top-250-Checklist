var MM = {
	cache : {},
	fn : {}
};
MM.fn = {
	insertBoxes : function() {
		var rowNum = 1, eachHandler;

		eachHandler = function() {
			var headingHTML, boxHTML, checkedBoxHTML, row = $(this), clickHandler, itemID;

			headingHTML = '<td class="MM-bolder">Watched?</td>';
			boxHTML = '<td class="MM-centered"><input type="checkbox" /></td>';
			checkedBoxHTML = '<td class="MM-centered"><input type="checkbox" checked /></td>';

			if (rowNum === 1) {
				row.append(headingHTML);
			} else {
				itemID = row.find('a').attr('href').replace('/title/', '')
						.slice(0, -1);

				localStorage.getItem(itemID) === 'true' ? row
						.append(checkedBoxHTML) : row.append(boxHTML);

				clickHandler = function() {
					$(this).is(':checked') ? localStorage.setItem(itemID,
							'true') : localStorage.removeItem(itemID);
				};

				row.find('input[type=checkbox]').click(clickHandler);
			}
			rowNum += 1;
		};

		MM.cache.main.find('table tbody tr').each(eachHandler);
	},

	init : function() {
		MM.cache.main = $('#main');
		MM.fn.insertBoxes();
	}
};
MM.fn.init();