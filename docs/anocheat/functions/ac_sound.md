# Méthodes AC_sound
Les méthodes `AC_sound*` permettent de jouer un son à la demande. C'est très pratique pour mutualiser des sons entre plusieurs fonctionalités.

## Obtenir la liste des sons de la médiathèque
Vous pouvez facilement obtenir la liste complète des sons de la médiathèque, notez que vous n'aurez que les noms.

```Javascript
console.log(AC_soundGet()); // Affichera ['son 1','son 2','...']
```

## Ajouter un son à la médiathèque

Ajouter un son permet de le rendre disponible pour tous les autres scripts quels qu'ils soient. La méthode `AC_soundAdd` permet de déclarer le
fichier à ajouter.

**Paramètres :**
- **name** (string) Nom du son dans la médiathèque
- **sound** (string) URL du fichier ou sa version encodée en base64 (vous devez inclure l'entête)

```Javascript
// Ajout du fichier avec son URL
AC_soundAdd('bleep', http://media.dvp.io/anocheat/sounds/bleep.wav');

// Ajout du fichier encodé en base64
AC_soundAdd('bleep', 'data:audio/wav;base64 UklGRpYLAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YScLAACAgICAgICAgICAgICAgICAgICAf4GAfHyNenOJjWt6mX5hjJ9ja6OJVYWuZGKgmU+Bq3JZmqBVdKWGUo2lZ2ScmVR7pX9VkqRfaaGTUYOmc1qYoVhxo4pSiqZpYZybU3qlgFWRpGBooJRRgqZ0WpihV3KkiFKMpmdinZpTfKV+VZKkX2qgk1GDpnNamKFYcqOKUYumaWGcm1N6pn9UkqVfaaCUUYOmdFqYoVhxo4tRiqZqYJycVHmlgFSRpWFnoJVRgqZ1WZihWHGjilGLpmlgnZtTe6WAVZKjYWmfk1KDpXVbl6BacaKKU4qlamGbmlV7o39XkaJhap+SU4Olcl2Xn1h0oodUjKVnZJyYVH2kfFiTol9sn5BThaRxXpidWHWihlSMpGhknJlUfKN/V5GiYWmelFOCpHdblaBccKCMU4ikbGGam1Z5ooJWj6JkZ52VVICjelmUoF5un49ThqNxX5idWXahhVWNo2dmnJdVfqJ7WZOhX22fkFSFo3FemJ1ZdaGIVYujamSamVZ7on9YkaFha52SVIOidV2WnltyoIpViqNrYpqaVnqigFeQomNpnZRUgaN3W5WgXXCfjVSHo29gmJxYd6GFVo2iZ2acl1V+ontZk6Bfbp6PVIWjcl+YnFl3oIBejphndZeDZoqPcHqRfXCLiHF/jnd3ioNzhId5fYh9eYSDen+EfnyCgX1/goB9f4GAfYCCfn6BgX1/gn99gIJ+foGBfYCCf36AgX5/gYB9gIJ/foGBfn+CgH6Agn5+gYB9f4J/foCBfn6CgH2Agn5+gYF9f4J/fYCCfn6BgH2Agn99gYJ9foKAfYCCfn2BgX1/goB9gIJ+foGAfX+Cf32AgX5+gYB9gIJ/fYGBfX+Cf32Agn5+goF8f4J/fYGCfX6CgH2AgX9+gYB+gIB/f4CAf3+AgH+AgIB/gIB/f4CAf4CAgH+AgIB/gIB/f4CAf4CAf3+AgH+AgIB/gIB/f4CAf4CAf3+AgH+AgIB/gICAf4CAf4CAgH+AgH9/gIB/gICAf4CAf3+AgH+AgIB/gIB/gICAf4CAgH+AgH+AgIB/gICAf4CAf4CAgH+AgH+AgIB/gICAgICAgIB/gICAgICAf4CAf4CAgH+AgH9/gIB/gIB/f4CAf4CAgH+AgIB/gIB/f4CAf4CAf3+AgH+AgH9/gIB/gICAf4CAf3+AgH+AgH9/gIB/f4CAf4CAgH+AgH9/gIB/gIB/f4CAf4CAgH+AgH+AgIB/gICAf4CAf3+AgH+AgH9/gIB/gICAf4CAf3+AgH+AgICAgIB/gICAf4CAf4CAgH+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf4CAgICAgH+AgH+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf39/gICAfXx8g42BeHR8iYuGc3B5i5WEdGN4jpqMZ2dxkpuMcFl1kKiMZGNxlpyXa1l3kqqJbV5xmJ2UZ2ByjqGOdVZwkJ6TbWVoipuZeVZthZ6UfWVihpmke2Fnfp+YiGFjgJafgWtceZiei2BkdZOcjXBVdpGhjGlkbZGbm3BacYqkkHhfao6bm3JjZ4Sel4BYaYWamHpoXYKan4FYaH2amIhnXX+WpYJnY3aZm5FmYHiRoYlxWXKUnpFoZG2NnZV2UnCLn5FzZGaKm6B3XGuDoJWCYGSGmJ97ZmF+nJuHXGV9lpyFbFZ7lqGIX2VzlJuUbVl3j6SLcGFuk5yYbWBuiaCSe1lri5yXdGZihZycflRqgZuXgWdegpikgGFmepyajWVgfZSihG1ddpiej2Rjc5Cdj3JRdJCgj2pkao+cm3RYcIiiknthZ4uanXZjZ4Kel4JcZ4SYmn1qW3+YnoRbZ3mWmYtsW3yTo4ZpZHOVm5RrX3aNoYt1XXCSnJNsZWqKnJR5VG6JnZJ0ZmWHmZ56W2uCnZWCZGOEl6F8ZmR9nJmIYGV9lZyEbVh6lZ6JYmZ0kpqRcFl3j6GKb2RukZqYb19wiaCQe11rjJqYdGZkhJuZgFdqgZmXgWlegJaggWJneJiZj2hfe5Gih3Bgc5Wbkmljb4yckXdVcIydkXBmZ4mamnlZboSdk39lZIaYn3tlZ36cmIhhZX+UnINtWnmVnYpiZnSRmpBxWHaOn4tvZW2PmppxX3CIoZB8X2uMmZh0Z2aEm5iAWWqCmJZ/al+Bl5+BYGh6mJiNaV99kqKEbWJ1l5qRaGNzjZ2OdlhxjpyRb2doiZqZeVhuhZySfWZlhpigemNpf5yXh2JlgZSbgGxee5ebiWFnd5KZjHBYeJCfimtlb5CamHBec4qijnlgbI6amHJlaYWcloBaa4SYlnxpX4GYnoFdaHuXl4tqX32SooRsY3WWmpFpY3WNnYx2WnKPm5FtZmqKmpd5Vm+GnJF6ZmWHmKB6YmqAnJaGY2WClZx/a2B7mJqIYWd6kpiFcGB9kJaDZ298kI+DcmyBi459cXeBj4Z7c3iIiYV4dX2GjH93d4CJhX92eoSFg3t6fIOFf3x5f4SDgHp8gIKCf318gIKBf31+f4GBgH59f4CBgH99foCBgX5+foCBgYB9fn+BgX9+fX+AgYB+fn+BgYB+fn+AgYB+fn+AgYB+fn6AgYB/fX6AgYB/fn6AgYGAfn5/gYB/fn6AgIGAfn5/gYCAfn5/gIGAfn5/gIGAfn5+gIGAf31/gIKAfn5+gIGAf31/gIKAf31+gIGBf35+gIGAf31+gIGBf359gIGBgH1+f4GBgH59f4GCgH59f4GBgH5+foCCgH99f4CBgH5+foCBgH99foCBgH9+foCAgX9+fn+BgIB9fn+BgYB+fX+BgYB9fn+BgX9+fX+AgYB+fn6BgYB+fX6AgoB/fX6BgYF+fX6AgoB/fX6AgYB/fn6AgIB/fn+AgIB/f3+AgIB/f3+AgICAf39/gICAf39/gICAf39/gICAgH9/gICAgH9/f4CAgH9/f3+AgH9/f4CAgIB/f4CAgH9/f3+AgH9/f4CAgH9/f4CAgH9/f3+AgIB/f3+AgH9/f3+AgIB/f4CAgIB/f3+AgIB/f3+AgIB/f3+AgIB/f3+AgIB/f39/gICAf3+AgICAf39/gICAf39/gICAf39/gICAf39/gICAf39/gICAgH9/gICAgH9/f4CAgH9/gICAgH9/f4CAgH9/f3+AgH9/f4CAgH9/f4CAf39/gICAgH9/f4CAgICAgICAgICAgH9/f4CAgICAgICAgH9/gICAf39/gICAf39/f4CAf39/f4CAf39/f4CAf39/gICAf39/gICAgH9/f4CAgH9/f3+AgH9/f3+AgH9/f3+AgH9/f4CAgH9/f4CAgH9/f4CAgH9/f4CAgIB/f4CAgH9/f3+AgH9/f3+AgH9/f3+AgIB/f3+AgIB/f3+AgICAf39/gIB/f39/gIB/f39/gIB/f39/gIB/f3+AgICAf39/gICAf3+AgICAf39/gICAf39/f4CAf39/f4CAf39/gICAf39/f4CAgH9/gICAgH9/f4CAf39/f4CAf39/f4CAgICAgICAgH9/gICAgH9/f4CAgH9/gICAgH9/f4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgH9/gICAgICAgICAf39/f4B/f39/gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgABMSVNUQgAAAElORk9JQ1JECwAAADE5OTUtMDktMjAAAElFTkcOAAAATWljaGFlbCBCcm9zcwBJU0ZUDAAAAFNvdW5kIEZvcmdlAA==');
```

Une fois un son ajouté il ne peut être supprimé ou modifié que lors du rechargement de la page du chat.

*Afin d'éviter tout problème de chargement, il est conseillé de ne pas dépasser 10kb par fichier*

## Jouer un son

Jouer un son est très facile, il vous suffit d'indiquer le nom du son à jouer ;o

```Javascript
AC_soundPlay('Bleep'); // Joue le son Bleep de la médiathèque
```
