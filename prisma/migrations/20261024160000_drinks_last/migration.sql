-- Move the drink categories after the food on the menu page, keeping the
-- existing relative order within each group
UPDATE "Category" AS c
SET "sortOrder" = r.rn - 1
FROM (
  SELECT id,
         ROW_NUMBER() OVER (
           ORDER BY slug IN (
             'fresh-juices', 'mojitos', 'milkshakes', 'smoothies', 'healthy-booster',
             'iced-coffee', 'hot-coffee', 'frappes', 'tea'
           ),
           "sortOrder"
         ) AS rn
  FROM "Category"
) AS r
WHERE c.id = r.id;
