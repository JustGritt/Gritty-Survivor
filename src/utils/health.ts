import { k } from "../kaboomContext";

export function initHealthBar(entity: { pos: { x: number; y: number; }; }, maxHP: any) {
    const healthBar = k.add([
        k.fixed(),
        k.rect(100, 10),
        k.anchor('left'),
        k.color(0, 255, 0),
        k.pos(entity.pos.x - 50, entity.pos.y - 50),
        {
            maxHP: maxHP,
            currentHP: maxHP,
            visible: false,
        },
    ]);

    return healthBar;
}

export function damageEntity(entity: { hp: () => any; hurt: (arg0: number) => void; }, damage: number) {
    if (entity.hp() <= 0) {
        return;
    }

    entity.hurt(damage);
    updateEntityHealthBar(entity, damage);
}

function updateEntityHealthBar(entity: any, damage: number) {
    entity.healthBar.currentHP -= damage;
    const hpRatio = entity.healthBar.currentHP / entity.healthBar.maxHP;

    entity.healthBar.width = hpRatio * 100;
    if (hpRatio > 0.5) {
        entity.healthBar.color = k.rgb(0, 255, 0);
    } else if (hpRatio > 0.25) {
        entity.healthBar.color = k.rgb(255, 255, 0);
    } else {
        entity.healthBar.color = k.rgb(255, 0, 0);
    }

    // Show or hide the health bar
    if (entity.healthBar.currentHP === entity.healthBar.maxHP) {
        entity.healthBar.visible = false;
    } else {
        entity.healthBar.visible = true;
    }
}