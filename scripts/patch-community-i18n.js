#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Patch i18n JSON files for new Community/Cases/Forum UI keys.
 *
 * Goal: eliminate next-intl missing keys for Community pages without manual edits
 * across all locales.
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['ar', 'el', 'en', 'es', 'fr', 'hi', 'pt', 'ru', 'zh'];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function ensure(obj, key, fallback) {
  if (obj[key] == null) obj[key] = fallback;
  return obj[key];
}

const commonAddsByLocale = {
  en: { back: 'Back', cancel: 'Cancel', publish: 'Publish', saving: 'Saving...' },
  pt: { back: 'Voltar', cancel: 'Cancelar', publish: 'Publicar', saving: 'Salvando...' },
  es: { back: 'Volver', cancel: 'Cancelar', publish: 'Publicar', saving: 'Guardando...' },
  fr: { back: 'Retour', cancel: 'Annuler', publish: 'Publier', saving: 'Enregistrement...' },
  ar: { back: 'رجوع', cancel: 'إلغاء', publish: 'نشر', saving: 'جار الحفظ...' },
  el: { back: 'Πίσω', cancel: 'Ακύρωση', publish: 'Δημοσίευση', saving: 'Αποθήκευση...' },
  hi: { back: 'वापस', cancel: 'रद्द करें', publish: 'प्रकाशित करें', saving: 'सहेजा जा रहा है...' },
  ru: { back: 'Назад', cancel: 'Отмена', publish: 'Опубликовать', saving: 'Сохранение...' },
  zh: { back: '返回', cancel: '取消', publish: '发布', saving: '保存中...' },
};

const communityJsonAddsByLocale = {
  en: {
    hero_title: 'Learn with peers',
    auth_required_short: 'Sign in to continue',
    auth_required_title: 'Login required',
    auth_required_desc: 'Sign in to create a post.',
    new_post: 'New post',
    new_post_desc: 'Write a question or discussion for the community.',
    select_post: 'Select a post',
    select_post_desc: 'Open a post from the forum.',
    post_not_found: 'Post not found',
    post_not_found_desc: 'This post may have been removed.',
    no_replies: 'No replies yet.',
    pinned: 'Pinned',
    locked: 'Locked',
    upvote: 'Upvote',
    post_fields: {
      title_label: 'Title',
      title_placeholder: 'e.g. Management of ...',
      content_label: 'Content',
      content_placeholder: 'Describe the context, your question, and what you have tried.',
    },
  },
  pt: {
    hero_title: 'Aprenda com a comunidade',
    auth_required_short: 'Login para continuar',
    auth_required_title: 'Login necessário',
    auth_required_desc: 'Faça login para criar um post.',
    new_post: 'Novo post',
    new_post_desc: 'Escreva uma pergunta ou discussão para a comunidade.',
    select_post: 'Selecione um post',
    select_post_desc: 'Abra um post a partir do fórum.',
    post_not_found: 'Post não encontrado',
    post_not_found_desc: 'Este post pode ter sido removido.',
    no_replies: 'Sem respostas ainda.',
    pinned: 'Fixado',
    locked: 'Bloqueado',
    upvote: 'Voto positivo',
    post_fields: {
      title_label: 'Título',
      title_placeholder: 'Ex: Conduta em ...',
      content_label: 'Conteúdo',
      content_placeholder: 'Descreva o contexto, sua dúvida e o que você já tentou.',
    },
  },
  es: {
    hero_title: 'Aprende con la comunidad',
    auth_required_short: 'Inicia sesión para continuar',
    auth_required_title: 'Se requiere iniciar sesión',
    auth_required_desc: 'Inicia sesión para crear un post.',
    new_post: 'Nuevo post',
    new_post_desc: 'Escribe una pregunta o discusión para la comunidad.',
    select_post: 'Selecciona un post',
    select_post_desc: 'Abre un post desde el foro.',
    post_not_found: 'Post no encontrado',
    post_not_found_desc: 'Este post puede haber sido eliminado.',
    no_replies: 'Aún no hay respuestas.',
    pinned: 'Fijado',
    locked: 'Cerrado',
    upvote: 'Voto positivo',
    post_fields: {
      title_label: 'Título',
      title_placeholder: 'Ej: Conducta en ...',
      content_label: 'Contenido',
      content_placeholder: 'Describe el contexto, tu duda y lo que ya has intentado.',
    },
  },
  fr: {
    hero_title: 'Apprenez avec la communauté',
    auth_required_short: 'Connectez-vous pour continuer',
    auth_required_title: 'Connexion requise',
    auth_required_desc: 'Connectez-vous pour créer un post.',
    new_post: 'Nouveau post',
    new_post_desc: 'Écrivez une question ou une discussion pour la communauté.',
    select_post: 'Sélectionnez un post',
    select_post_desc: 'Ouvrez un post depuis le forum.',
    post_not_found: 'Post introuvable',
    post_not_found_desc: 'Ce post a peut-être été supprimé.',
    no_replies: 'Pas encore de réponses.',
    pinned: 'Épinglé',
    locked: 'Verrouillé',
    upvote: 'Vote positif',
    post_fields: {
      title_label: 'Titre',
      title_placeholder: 'Ex : Conduite pour ...',
      content_label: 'Contenu',
      content_placeholder: 'Décrivez le contexte, votre question et ce que vous avez déjà essayé.',
    },
  },
  ar: {
    hero_title: 'تعلّم مع المجتمع',
    auth_required_short: 'سجّل الدخول للمتابعة',
    auth_required_title: 'تسجيل الدخول مطلوب',
    auth_required_desc: 'سجّل الدخول لإنشاء منشور.',
    new_post: 'منشور جديد',
    new_post_desc: 'اكتب سؤالاً أو نقاشاً للمجتمع.',
    select_post: 'اختر منشوراً',
    select_post_desc: 'افتح منشوراً من المنتدى.',
    post_not_found: 'لم يتم العثور على المنشور',
    post_not_found_desc: 'قد يكون هذا المنشور قد تمت إزالته.',
    no_replies: 'لا توجد ردود بعد.',
    pinned: 'مثبّت',
    locked: 'مغلق',
    upvote: 'تصويت إيجابي',
    post_fields: {
      title_label: 'العنوان',
      title_placeholder: 'مثال: تدبير ...',
      content_label: 'المحتوى',
      content_placeholder: 'صف السياق وسؤالك وما الذي جربته.',
    },
  },
  el: {
    hero_title: 'Μάθετε με την κοινότητα',
    auth_required_short: 'Συνδεθείτε για να συνεχίσετε',
    auth_required_title: 'Απαιτείται σύνδεση',
    auth_required_desc: 'Συνδεθείτε για να δημιουργήσετε μια ανάρτηση.',
    new_post: 'Νέα ανάρτηση',
    new_post_desc: 'Γράψτε μια ερώτηση ή συζήτηση για την κοινότητα.',
    select_post: 'Επιλέξτε μια ανάρτηση',
    select_post_desc: 'Ανοίξτε μια ανάρτηση από το φόρουμ.',
    post_not_found: 'Η ανάρτηση δεν βρέθηκε',
    post_not_found_desc: 'Αυτή η ανάρτηση μπορεί να έχει αφαιρεθεί.',
    no_replies: 'Δεν υπάρχουν ακόμη απαντήσεις.',
    pinned: 'Καρφιτσωμένο',
    locked: 'Κλειδωμένο',
    upvote: 'Θετική ψήφος',
    post_fields: {
      title_label: 'Τίτλος',
      title_placeholder: 'π.χ. Διαχείριση ...',
      content_label: 'Περιεχόμενο',
      content_placeholder: 'Περιγράψτε το πλαίσιο, την ερώτησή σας και τι έχετε ήδη δοκιμάσει.',
    },
  },
  hi: {
    hero_title: 'समुदाय के साथ सीखें',
    auth_required_short: 'जारी रखने के लिए साइन इन करें',
    auth_required_title: 'लॉगिन आवश्यक',
    auth_required_desc: 'पोस्ट बनाने के लिए साइन इन करें।',
    new_post: 'नया पोस्ट',
    new_post_desc: 'समुदाय के लिए एक प्रश्न या चर्चा लिखें।',
    select_post: 'एक पोस्ट चुनें',
    select_post_desc: 'फोरम से एक पोस्ट खोलें।',
    post_not_found: 'पोस्ट नहीं मिला',
    post_not_found_desc: 'यह पोस्ट हटाया जा चुका हो सकता है।',
    no_replies: 'अभी तक कोई जवाब नहीं।',
    pinned: 'पिन किया हुआ',
    locked: 'लॉक्ड',
    upvote: 'अपवोट',
    post_fields: {
      title_label: 'शीर्षक',
      title_placeholder: 'उदा: प्रबंधन ...',
      content_label: 'विवरण',
      content_placeholder: 'संदर्भ, आपका प्रश्न, और आपने क्या प्रयास किया है, बताएं।',
    },
  },
  ru: {
    hero_title: 'Учитесь вместе с сообществом',
    auth_required_short: 'Войдите, чтобы продолжить',
    auth_required_title: 'Требуется вход',
    auth_required_desc: 'Войдите, чтобы создать пост.',
    new_post: 'Новый пост',
    new_post_desc: 'Напишите вопрос или обсуждение для сообщества.',
    select_post: 'Выберите пост',
    select_post_desc: 'Откройте пост из форума.',
    post_not_found: 'Пост не найден',
    post_not_found_desc: 'Этот пост мог быть удалён.',
    no_replies: 'Пока нет ответов.',
    pinned: 'Закреплено',
    locked: 'Закрыто',
    upvote: 'Плюс',
    post_fields: {
      title_label: 'Заголовок',
      title_placeholder: 'Напр.: Тактика при ...',
      content_label: 'Содержание',
      content_placeholder: 'Опишите контекст, ваш вопрос и что вы уже пробовали.',
    },
  },
  zh: {
    hero_title: '与社区一起学习',
    auth_required_short: '登录以继续',
    auth_required_title: '需要登录',
    auth_required_desc: '登录后即可创建帖子。',
    new_post: '新帖子',
    new_post_desc: '为社区写下一个问题或讨论。',
    select_post: '选择一个帖子',
    select_post_desc: '从论坛打开一个帖子。',
    post_not_found: '未找到帖子',
    post_not_found_desc: '该帖子可能已被删除。',
    no_replies: '暂无回复。',
    pinned: '置顶',
    locked: '已锁定',
    upvote: '点赞',
    post_fields: {
      title_label: '标题',
      title_placeholder: '例如：处理 ...',
      content_label: '内容',
      content_placeholder: '描述背景、你的问题，以及你已经尝试过的内容。',
    },
  },
};

const caseAddsByLocale = {
  en: {
    none_published: 'No published cases yet.',
    open: 'Open',
    not_found_title: 'Case not found',
    not_found_desc: 'This case may be private or unpublished.',
    upvote: 'Upvote',
    case_data: 'Case',
    views: 'views',
  },
  pt: {
    none_published: 'Sem casos publicados ainda.',
    open: 'Abrir',
    not_found_title: 'Caso não encontrado',
    not_found_desc: 'Este caso pode estar privado ou não publicado.',
    upvote: 'Voto positivo',
    case_data: 'Caso',
    views: 'visualizações',
  },
  es: {
    none_published: 'Aún no hay casos publicados.',
    open: 'Abrir',
    not_found_title: 'Caso no encontrado',
    not_found_desc: 'Este caso puede ser privado o no estar publicado.',
    upvote: 'Voto positivo',
    case_data: 'Caso',
    views: 'vistas',
  },
  fr: {
    none_published: 'Aucun cas publié pour le moment.',
    open: 'Ouvrir',
    not_found_title: 'Cas introuvable',
    not_found_desc: "Ce cas peut être privé ou non publié.",
    upvote: 'Vote positif',
    case_data: 'Cas',
    views: 'vues',
  },
  ar: {
    none_published: 'لا توجد حالات منشورة بعد.',
    open: 'فتح',
    not_found_title: 'لم يتم العثور على الحالة',
    not_found_desc: 'قد تكون هذه الحالة خاصة أو غير منشورة.',
    upvote: 'تصويت إيجابي',
    case_data: 'حالة',
    views: 'مشاهدات',
  },
  el: {
    none_published: 'Δεν υπάρχουν ακόμη δημοσιευμένες περιπτώσεις.',
    open: 'Άνοιγμα',
    not_found_title: 'Η περίπτωση δεν βρέθηκε',
    not_found_desc: 'Αυτή η περίπτωση μπορεί να είναι ιδιωτική ή μη δημοσιευμένη.',
    upvote: 'Θετική ψήφος',
    case_data: 'Περίπτωση',
    views: 'προβολές',
  },
  hi: {
    none_published: 'अभी तक कोई प्रकाशित केस नहीं।',
    open: 'खोलें',
    not_found_title: 'केस नहीं मिला',
    not_found_desc: 'यह केस निजी या अप्रकाशित हो सकता है।',
    upvote: 'अपवोट',
    case_data: 'केस',
    views: 'व्यू',
  },
  ru: {
    none_published: 'Пока нет опубликованных случаев.',
    open: 'Открыть',
    not_found_title: 'Случай не найден',
    not_found_desc: 'Этот случай может быть приватным или не опубликованным.',
    upvote: 'Плюс',
    case_data: 'Случай',
    views: 'просмотры',
  },
  zh: {
    none_published: '暂无已发布病例。',
    open: '打开',
    not_found_title: '未找到病例',
    not_found_desc: '该病例可能是私密的或未发布。',
    upvote: '点赞',
    case_data: '病例',
    views: '浏览',
  },
};

let changed = 0;

for (const locale of LOCALES) {
  const commonPath = path.join(__dirname, '..', 'messages', locale, 'common.json');
  const communityPath = path.join(__dirname, '..', 'messages', locale, 'community.json');

  const commonJson = readJson(commonPath);
  const commonRoot = ensure(commonJson, 'common', {});

  const commonAdds = commonAddsByLocale[locale] || commonAddsByLocale.en;
  for (const [k, v] of Object.entries(commonAdds)) ensure(commonRoot, k, v);

  const communityRoot = ensure(commonJson, 'community', {});
  const casesRoot = ensure(communityRoot, 'cases', {});

  const caseAdds = caseAddsByLocale[locale] || caseAddsByLocale.en;
  for (const [k, v] of Object.entries(caseAdds)) ensure(casesRoot, k, v);

  writeJson(commonPath, commonJson);

  const communityJson = readJson(communityPath);
  const communityNs = ensure(communityJson, 'community', {});
  const adds = communityJsonAddsByLocale[locale] || communityJsonAddsByLocale.en;

  for (const [k, v] of Object.entries(adds)) {
    if (typeof v === 'object' && v && !Array.isArray(v)) {
      const dst = ensure(communityNs, k, {});
      for (const [k2, v2] of Object.entries(v)) {
        if (typeof v2 === 'object' && v2 && !Array.isArray(v2)) {
          const dst2 = ensure(dst, k2, {});
          for (const [k3, v3] of Object.entries(v2)) ensure(dst2, k3, v3);
        } else {
          ensure(dst, k2, v2);
        }
      }
    } else {
      ensure(communityNs, k, v);
    }
  }

  writeJson(communityPath, communityJson);
  changed++;
}

console.log(`Patched locales: ${changed}`);

