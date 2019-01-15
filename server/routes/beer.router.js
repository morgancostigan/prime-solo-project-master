const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style",         to_char("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description",           "brewery"."name", "brewery"."logo_url", "brewery"."id" as "brewery_id", array_agg(
        DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id"
        GROUP BY "beer_name", "beer"."id", "beer"."style", "release", "beer"."description", "brewery"."name", "brewery"."logo_url", "brewery"."id" ORDER BY random();`);
    pool.query(queryText).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/portfolio', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "beer"."name" AS "beer_name", "beer"."id", "beer"."style",         to_char ("beer"."release", 'Mon dd, YYYY') as "release", "beer"."description",  
        "brewery"."logo_url", array_agg( DISTINCT "style"."tag") AS "tag_list" FROM "beer" 
        JOIN "brewery" ON "brewery"."id" = "beer"."brewery_id"
        JOIN "style_beer" ON "beer"."id" = "style_beer"."beer_id"
        JOIN "style" ON "style"."id" = "style_beer"."style_id" 
        WHERE "brewery_id" = $1 GROUP BY "beer"."name", "beer"."id", "brewery"."logo_url"`);
        pool.query(queryText, [req.query.id])
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('error in getting beer:', err);
            res.sendStatus(500)
        })
});

/**
 * Logged in user can post new Beer
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
    const queryText = `WITH beerInsert AS (
    INSERT INTO "beer" ("brewery_id", "name", "style", "release", "description", "image_url") VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id")
    INSERT INTO "style_beer" ("style_id", "beer_id") 
    VALUES ($7, (SELECT "id" FROM beerInsert)), 
    ($8, (SELECT "id" FROM beerInsert)), 
    ($9, (SELECT "id" FROM beerInsert));`
    pool.query(queryText, [req.body.brewery_id, req.body.name, req.body.style, req.body.release, req.body.description, req.body.image_url, req.body.tag1, req.body.tag2, req.body.tag3])
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log('error in beer POST:', err);
            res.sendStatus(500);
        })
});

module.exports = router;
