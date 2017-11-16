guns = {
	index: ["bouncer", "lazer", "blaster", "trapper", "thrower", "cracker", "burner"],
	bouncer: {
		name: "bouncer",
		description: "Shoots bouncy balls",
		colour: "skyblue",
		normal: function(player) {
			force = 0.2
			ballsize = 30
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.2
			ballsize = 30
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					if (box.body.circleRadius < 300) {
						Body.scale(box.body, (box.body.circleRadius+3)/box.body.circleRadius, (box.body.circleRadius+3)/box.body.circleRadius)
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			force = 0.1
			ballsize = 30
			damage = 12
			bounce = 1
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	},
	lazer: {
		name: "lazer",
		description: "Shoots mutiple smaller balls in a line",
		colour: "#470059",
		normal: function(player) {
			force = 0.1
			ballsize = 20
			damage = 6
			bounce = 1
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			player.action(function() {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
			}, 10)
		},
		power: function(player) {
			force = 0.1
			ballsize = 20
			damage = 6
			bounce = 1
			number = 11
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			for (var i = 0; i < number; i++) {
				player.action(function() {
					bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force})
				}, (i+1) * 5)
			}
			
		},
		ultimate: function(player) {
			force = 0.05  
			ballsize = 20
			damage = 6
			bounce = 1
			number = 16
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 10)
		}
	},
	blaster: {
		name: "blaster",
		description: "Shoots mutiple shells in a wide angle",
		colour: "#006666",
		normal: function(player) {
			force = 0.05
			ballsize = 15
			damage = 5
			bounce = 0.8
			minangle = -5
			maxangle = 5
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle) * player.cannon.length, player.y + cos(player.angle+minangle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle) * force, y: cos(player.angle+minangle) * force});
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+maxangle) * player.cannon.length, player.y + cos(player.angle+maxangle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+maxangle) * force, y: cos(player.angle+maxangle) * force});
		},
		power: function(player) {
			force = 0.05  
			ballsize = 15
			damage = 5
			bounce = 1
			number = 6
			minangle = -15
			maxangle = 15
			for (var i = 0; i < number; i++) {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, player.y + cos(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle+i*(maxangle - minangle)/number) * force, y: cos(player.angle+minangle+i*(maxangle - minangle)/number) * force});
			}
			for (var j = 0; j < 5; j++) {
				player.action(function() {
					for (var i = 0; i < number; i++) {
						bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, player.y + cos(player.angle+minangle+i*(maxangle - minangle)/number) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
						Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle+minangle+i*(maxangle - minangle)/number) * force, y: cos(player.angle+minangle+i*(maxangle - minangle)/number) * force});
					}
				}, 10 + j * 10)
			}
		},
		ultimate: function(player) {
			force = 0.1 
			ballsize = 15
			damage = 5
			bounce = 1
			number = 16
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 5)
			player.action(function() {
				for (var i = 0; i < number; i++) {
					x = canvaswidth / number * (i+0.5)
					bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage));
					Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
				}
			}, 10)
		}
	},
	trapper: {
		name: "trapper",
		description: "Shoots pointy triangles",
		colour: "#afffdd",
		normal: function(player) {
			force = 0.15
			ballsize = 40
			damage = 12
			bounce = 1
			bullets.push(new Bullet(Bodies.polygon(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage));
			Body.setAngularVelocity(bullets[bullets.length-1].body, random(-0.1, 0.1))
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.15
			ballsize = 40
			damage = 24
			bounce = 1
			bullets.push(new Bullet(Bodies.polygon(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					radiusLength = sqrt((box.body.position.x - box.body.vertices[0].x)**2 + (box.body.position.y - box.body.vertices[0].y)**2);
					if (radiusLength < 100) {
						Body.scale(box.body, (radiusLength+1)/radiusLength, (radiusLength+1)/radiusLength)
					}
					if (box.hits >= 3) {
						force = 0.05
						ballsize = 30
						damage = 6
						bounce = 1
						number = 6
						for (var i = 0; i < number; i++) {
							bullets.push(new Bullet(Bodies.polygon(box.body.position.x, box.body.position.y, 3, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.setAngularVelocity(bullets[bullets.length-1].body, random(-0.1, 0.1))
							Body.applyForce(bullets[bullets.length-1].body, {x: box.body.position.x, y: box.body.position.y}, {x: sin(360/number*i) * force, y: cos(360/number*i) * force});
						}
						box.rip();
					}
				}
			}));
			Body.setAngularVelocity(bullets[bullets.length-1].body, random(-0.1, 0.1))
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			force = 0.15
			ballsize = 40
			damage = 24
			bounce = 1
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.polygon(x, player.y - player.cannon.length, 3, ballsize, { restitution: bounce }), this.colour, damage));
				Body.setAngularVelocity(bullets[bullets.length-1].body, random(-0.1, 0.1))
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	},
	thrower: {
		name: "thrower",
		description: "Throws spiraling footballs",
		colour: "#493722",
		normal: function(player) {
			force = 0.3
			ballsize = 8
			damage = 8
			bounce = 0.6
			vertices = [
				{x: player.x + cos(player.angle) * 3 * ballsize + sin(player.angle) * 4 * ballsize,
				y: player.y - sin(player.angle) * 3 * ballsize + cos(player.angle) * 4 * ballsize},
				{x: player.x + sin(player.angle) * 7 * ballsize,
				y: player.y + cos(player.angle) * 7 * ballsize},
				{x: player.x + cos(player.angle) * -3 * ballsize + sin(player.angle) * 4 * ballsize,
				y: player.y - sin(player.angle) * -3 * ballsize + cos(player.angle) * 4 * ballsize},
				{x: player.x - cos(player.angle) * -4 * ballsize, 
				y: player.y + sin(player.angle) * -4 * ballsize},
				{x: player.x + cos(player.angle) * -3 * ballsize + sin(player.angle) * -4 * ballsize,
				y: player.y - sin(player.angle) * -3 * ballsize + cos(player.angle) * -4 * ballsize},
				{x: player.x + cos(player.angle) * 3 * ballsize + sin(player.angle) * -4 * ballsize,
				y: player.y - sin(player.angle) * 3 * ballsize + cos(player.angle) * -4 * ballsize},
				{x: player.x + sin(player.angle) * -7 * ballsize,
				y: player.y + cos(player.angle) * -7 * ballsize},
				{x: player.x - cos(player.angle) * 4 * ballsize, 
				y: player.y + sin(player.angle) * 4 * ballsize},
			]
			bullets.push(new Bullet(Bodies.fromVertices(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, vertices, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					if (pos.y > canvasheight/* && box.hits == 0*/) {
						force = -0.115
						ballsize = 20
						damage = 16
						bounce = 0.6
						bullets.push(new Bullet(Bodies.circle(box.body.position.x, box.body.position.y, ballsize, { restitution: bounce }), player.gun.colour, damage));
						Body.applyForce(bullets[bullets.length-1].body, {x: box.body.position.x, y: box.body.position.y}, {x: 0, y: force});
						box.rip();
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			Body.setAngularVelocity(bullets[bullets.length-1].body, radians(player.angle/60))
		},
		power: function(player) {
			force = 0.7
			ballsize = 10
			damage = 12
			bounce = 0.6
			vertices = [
				{x: player.x + cos(player.angle) * 3 * ballsize + sin(player.angle) * 4 * ballsize,
				y: player.y - sin(player.angle) * 3 * ballsize + cos(player.angle) * 4 * ballsize},
				{x: player.x + sin(player.angle) * 7 * ballsize,
				y: player.y + cos(player.angle) * 7 * ballsize},
				{x: player.x + cos(player.angle) * -3 * ballsize + sin(player.angle) * 4 * ballsize,
				y: player.y - sin(player.angle) * -3 * ballsize + cos(player.angle) * 4 * ballsize},
				{x: player.x - cos(player.angle) * -4 * ballsize, 
				y: player.y + sin(player.angle) * -4 * ballsize},
				{x: player.x + cos(player.angle) * -3 * ballsize + sin(player.angle) * -4 * ballsize,
				y: player.y - sin(player.angle) * -3 * ballsize + cos(player.angle) * -4 * ballsize},
				{x: player.x + cos(player.angle) * 3 * ballsize + sin(player.angle) * -4 * ballsize,
				y: player.y - sin(player.angle) * 3 * ballsize + cos(player.angle) * -4 * ballsize},
				{x: player.x + sin(player.angle) * -7 * ballsize,
				y: player.y + cos(player.angle) * -7 * ballsize},
				{x: player.x - cos(player.angle) * 4 * ballsize, 
				y: player.y + sin(player.angle) * 4 * ballsize},
			]
			bullets.push(new Bullet(Bodies.fromVertices(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, vertices, { restitution: bounce }), this.colour, damage, {
				update: function(box) {
					if (pos.y > canvasheight/* && box.hits == 0*/) {
						force = -0.25
						ballsize = 30
						damage = 24
						bounce = 0.6
						number = 12
						for (var i = 0; i < number; i++) {
							x = canvaswidth / number * (i+0.5)
							bullets.push(new Bullet(Bodies.circle(x, canvasheight, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.applyForce(bullets[bullets.length-1].body, {x: box.body.position.x, y: box.body.position.y}, {x: 0, y: force});
						}
						box.rip();
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			Body.setAngularVelocity(bullets[bullets.length-1].body, radians(player.angle/60))
		},
		ultimate: function(player) {
			force = 0.1
			ballsize = 30
			damage = 12
			bounce = 1
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				force = 0.3
				ballsize = 8
				damage = 8
				bounce = 0.6
				vertices = [
					{x: x + 3 * ballsize,
					y: 4 * ballsize},
					{x: x,
					y: 7 * ballsize},
					{x: x - 3 * ballsize,
					y: 4 * ballsize},
					{x: x + 4 * ballsize, 
					y: 0},
					{x: x -3 * ballsize,
					y: -4 * ballsize},
					{x: x + 3 * ballsize,
					y: -4 * ballsize},
					{x: x,
					y: -7 * ballsize},
					{x: x - 4 * ballsize, 
					y: 0},
				]
				bullets.push(new Bullet(Bodies.fromVertices(x, player.y - player.cannon.length, vertices, { restitution: bounce }), this.colour, damage, {
					update: function(box) {
						if (pos.y > canvasheight/* && box.hits == 0*/) {
							force = -0.115
							ballsize = 20
							damage = 16
							bounce = 0.6
							bullets.push(new Bullet(Bodies.circle(box.body.position.x, box.body.position.y, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.applyForce(bullets[bullets.length-1].body, {x: box.body.position.x, y: box.body.position.y}, {x: 0, y: force});
							box.rip();
						}
					}
				}));
			}
		}
	},
	cracker: {
		name: "cracker",
		description: "Shoots electric bolts",
		colour: "yellow",
		normal: function(player) {
			force = 0.15
			ballsize = 25
			damage = 6
			bounce = 0.7
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				onEnemy: function(box, meanie) {
					damage = 6
					minlength = canvaswidth
					meanest = meanie
					for (var i = 0; i < enemies.length; i++) {
						enemy = enemies[i];
						if (length(meanie.body.position, enemy.body.position) != 0 && length(meanie.body.position, enemy.body.position) < minlength) {
							meanest = enemy
							minlength = length(meanie.body.position, enemy.body.position)
						}
					}
					if (meanest.colour != "yellow") {
						meanest.shock = meanest.colour
						meanest.action(function(me) {
							me.colour = me.shock;
						}, 10)
						meanest.colour = "yellow"
					}
			        meanest.damage(box.damage);
			        player.nextPower += box.damage;
			        if (player.nextPower >= player.powerRate) {
			        	player.nextPower = player.powerRate;
			        }
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.25
			ballsize = 35
			damage = 6
			bounce = 0.7
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				onEnemy: function(box, meanie) {
					damage = 6
					for (var i = 0; i < enemies.length; i++) {
						enemy = enemies[i];
						if (length(meanie.body.position, enemy.body.position) != 0) {
							if (enemy.colour != "yellow") {
								enemy.shock = enemy.colour
								enemy.action(function(me) {
									me.colour = me.shock;
								}, 10)
								enemy.colour = "yellow"
							}
							enemy.damage(box.damage);
					        player.nextPower += box.damage;
					        if (player.nextPower >= player.powerRate) {
					        	player.nextPower = player.powerRate;
					        }
						}
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			player.action(function() {
				bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), player.gun.colour, damage, {
					onEnemy: function(box, meanie) {
						damage = 6
						for (var i = 0; i < enemies.length; i++) {
							enemy = enemies[i];
							if (length(meanie.body.position, enemy.body.position) != 0) {
								if (enemy.colour != "yellow") {
									enemy.shock = enemy.colour
									enemy.colour = "yellow"
									enemy.action(function(me) {
										me.colour = me.shock;
									}, 10)
								}
								enemy.damage(floor(box.damage/2));
						        player.nextPower += box.damage;
						        if (player.nextPower >= player.powerRate) {
						        	player.nextPower = player.powerRate;
						        }
							}
						}
					}
				}));
				Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
			}, 20)
		},
		ultimate: function(player) {
			force = 0.15
			ballsize = 25
			damage = 6
			bounce = 0.7
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
					onEnemy: function(box, meanie) {
						damage = 6
						minlength = canvaswidth
						meanest = meanie
						for (var i = 0; i < enemies.length; i++) {
							enemy = enemies[i];
							if (length(meanie.body.position, enemy.body.position) != 0 && length(meanie.body.position, enemy.body.position) < minlength) {
								meanest = enemy
								minlength = length(meanie.body.position, enemy.body.position)
							}
						}
						if (meanest.colour != "yellow") {
							meanest.shock = meanest.colour
							meanest.action(function(me) {
								me.colour = me.shock;
							}, 10)
							meanest.colour = "yellow"
						}
				        meanest.damage(box.damage);
				        player.nextPower += box.damage;
				        if (player.nextPower >= player.powerRate) {
				        	player.nextPower = player.powerRate;
				        }
					}
				}));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	},
	burner: {
		name: "burner",
		description: "Shoots flaming hot fireballs",
		colour: "#f62817",
		normal: function(player) {
			force = 0.15
			ballsize = 25
			damage = 6
			bounce = 0.6
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				onEnemy: function(box, meanie) {
					for (var i = 0; i < 4; i++) {
						meanie.action(function(me) {
							force = 0.01
							ballsize = 10
							damage = 1
							bounce = 1.2
							randangle = random(170, 190)
							bullets.push(new Bullet(Bodies.circle(me.body.position.x, me.body.position.y - me.body.circleRadius - ballsize, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.applyForce(bullets[bullets.length-1].body, {x: me.body.position.x, y: me.body.position.y}, {x: sin(randangle) * force, y: cos(randangle) * force});
						}, i * 30 + 10)
					}
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		power: function(player) {
			force = 0.05
			ballsize = 10
			damage = 6
			bounce = 0.6
			bullets.push(new Bullet(Bodies.circle(player.x + sin(player.angle) * player.cannon.length, player.y + cos(player.angle) * player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
				onEnemy: function(box, meanie) {
					for (var i = 0; i < 40; i++) {
						meanie.action(function(me) {
							force = 0.02
							ballsize = 10
							damage = 2
							bounce = 0.3
							randangle = random(120, 240)
							bullets.push(new Bullet(Bodies.circle(me.body.position.x, me.body.position.y - me.body.circleRadius - ballsize, ballsize, { restitution: bounce }), player.gun.colour, damage));
							Body.applyForce(bullets[bullets.length-1].body, {x: me.body.position.x, y: me.body.position.y}, {x: sin(randangle) * force, y: cos(randangle) * force});
						}, i * 5 + 10)
					}
					box.rip();
				}
			}));
			Body.applyForce(bullets[bullets.length-1].body, {x: player.x, y: player.y}, {x: sin(player.angle) * force, y: cos(player.angle) * force});
		},
		ultimate: function(player) {
			force = 0.15
			ballsize = 25
			damage = 6
			bounce = 0.7
			number = 12
			for (var i = 0; i < number; i++) {
				x = canvaswidth / number * (i+0.5)
				bullets.push(new Bullet(Bodies.circle(x, player.y - player.cannon.length, ballsize, { restitution: bounce }), this.colour, damage, {
					onEnemy: function(box, meanie) {
						
					}
				}));
				Body.applyForce(bullets[bullets.length-1].body, {x: x, y: player.y}, {x: 0, y: force});
			}
		}
	}
}