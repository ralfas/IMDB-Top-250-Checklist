var MM = {
	cache : {},
	fn : {}
};

MM.fn = {
	insertRow : function() {
		var html = '<tr><td colspan=5 class="MM-right"><span id="MM-viewed"></span></td></tr>';

		MM.cache.tableBody.append(html);
		MM.cache.total = MM.cache.tableBody.find('#MM-viewed');
	},

	insertBoxes : function() {
		var rowNum = 1, eachHandler, viewed = 0;

		eachHandler = function() {
			var headingHTML, boxHTML, checkedBoxHTML, row = $(this), clickHandler, itemID;

			headingHTML = '<td class="MM-bolder">Watched?</td>';
			boxHTML = '<td class="MM-centered"><input type="checkbox" /></td>';
			checkedBoxHTML = '<td class="MM-centered"><input type="checkbox" checked /></td>';

			if (rowNum === 1) {
				row.append(headingHTML);
			} else if (rowNum <= 251) {
				itemID = row.find('a').attr('href').replace('/title/', '')
						.slice(0, -1);

				if (localStorage.getItem(itemID) === 'true') {
					row.append(checkedBoxHTML);
					viewed += 1;
				} else {
					row.append(boxHTML);
				}

				clickHandler = function() {
					if ($(this).is(':checked')) {
						localStorage.setItem(itemID, 'true');
						viewed += 1;
					} else {
						localStorage.removeItem(itemID);
						viewed -= 1;
					}
					MM.cache.total.html(viewed + ' of 250');
				};
				row.find('input[type=checkbox]').click(clickHandler);
			}
			rowNum += 1;
		};
		MM.cache.tableBody.find('tr').each(eachHandler);

		MM.cache.total.html(viewed + ' of 250');
	},

	init : function() {
		MM.cache.main = $('#main');
		MM.cache.tableBody = MM.cache.main.find('table tbody');
		MM.fn.insertRow();
		MM.fn.insertBoxes();
	}
};

MM.fn.init();