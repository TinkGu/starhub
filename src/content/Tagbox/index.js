import { hs } from '@/utils/dom'
import Tag from '@/content/Tag'
import PlusIcon from '@/../static/svg/add.svg'
import './tagbox.less'

export default function Tagbox({
    tags = [],
}) {
    return hs.div('.shub-tagbox.container',
        tags.map(x => Tag(x)),
        hs.div('.shub-add-tag-btn',
            hs.img('.shub-add-icon', { src: PlusIcon })
        )
    )
}
