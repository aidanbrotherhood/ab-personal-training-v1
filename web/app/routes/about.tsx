import "../about-me.css";
import { PageShell } from "../components/site";

/**
 * Long-form personal essay. The original wording and paragraph order are preserved
 * from the approved November 2026 manuscript; separators mark its six movements.
 */
const chapters: readonly (readonly string[])[] = [
  [
    "I was eighteen when I stopped playing tennis.",
    "Until then, it had been the most important thing in my life. I loved the sport, the training, the competition and the feeling that there was always something to work towards. For years, it occupied my thoughts in a way that very little else did. It was more than something I enjoyed. It had become a large part of how I understood myself.",
    "I wanted to be a professional tennis player.",
    "Looking back, I can see how unrealistic that ambition was. I was athletic, and there were aspects of the physical side of sport that came naturally to me, but athleticism only takes you so far. I didn't have the technical ability or the mentality required to compete at that level. Whatever I might have wanted, I was nowhere near good enough to make a career of it.",
    "That's easier to acknowledge now than it was at eighteen.",
    "When you're young and you've invested so much of yourself in something, it's difficult to imagine what your life might look like without it. Tennis had given me a sense of direction. There was always another session, another competition, another opportunity to improve. Even when things weren't going well, I knew what I was supposed to be working towards.",
    "Eventually, I had to accept that the future I'd imagined wasn't going to happen.",
    "So I stopped.",
    "What I find strange, looking back, is how completely I seemed to walk away from that part of myself. I didn't simply stop pursuing tennis. I gradually distanced myself from the athletic side of my life altogether.",
    "I had spent years caring about what my body could do, how I moved and how I performed. Yet rather than finding another way to explore those interests, I turned my attention somewhere entirely different.",
    "I don't think I understood what I was leaving behind.",
    "Around a year later, I started a marketing agency.",
    "I had become interested in business and entrepreneurship, and the idea of building something of my own appealed to me enormously. There was something exciting about being responsible for creating something that hadn't existed before. I liked the independence of it, the possibilities and the sense that the future wasn't already decided for me.",
    "In many ways, I still feel that attraction.",
    "But I can also see that starting a business gave me another identity to pursue at a time when I was losing one.",
    "I had stopped trying to become an athlete. Now I was trying to become a successful entrepreneur.",
    "I threw myself into it.",
    "For years, the company occupied an enormous amount of my attention. I thought about what it could become, the clients I might work with, the kind of business I wanted to build and the life that success might eventually make possible.",
    "And there were times when it felt real. I had clients. I did the work. It wasn't an imaginary business or something I had merely talked about doing.",
    "But it was never particularly successful.",
    "Certainly not in the way I wanted it to be.",
    "The business didn't grow into what I'd imagined, and the longer that went on, the harder I found it to acknowledge the distance between what I hoped it would become and what it actually was.",
    "I kept going.",
    "There was always a reason to believe the next few months might be different. Another client, another opportunity, another change in direction. I could convince myself that I was making progress, or that the progress I wanted was just around the corner.",
    "Some of those reasons were genuine. Running a small business is difficult, and success isn't always immediate or predictable. There are plenty of good reasons to persevere when things aren't working.",
    "But looking back, I think there came a point when I wasn't continuing simply because I believed in the business.",
    "I was continuing because I couldn't bear what it would mean to stop.",
    "I had spent years telling myself, and to some extent other people, that I was building something. Being an entrepreneur had become part of who I was. The possibility that it might not work out felt like more than a commercial disappointment. It felt like a judgement on me.",
    "What would I be if I wasn't the person building ambio?",
    "What would those years have been for?",
    "And perhaps most uncomfortably, what would it say about me if I had to admit that I'd failed?",
    "I don't remember thinking about those questions in such clear terms at the time. They are questions I've come to understand over time, having had some distance from that period of my life.",
    "At the time, I was mostly concerned with keeping the business alive.",
    "I continued for years longer than I probably should have. Eventually, in 2023, I had to accept that it wasn't going to become the company I wanted it to be.",
    "And I stopped.",
    "I sometimes wonder why I'd been able to accept the end of my tennis ambitions at eighteen, yet found it so difficult to let go of a business that wasn't working.",
    "Perhaps I had invested more than time and effort into it. Perhaps, having already walked away from one imagined future, I was particularly reluctant to walk away from another.",
    "I don't know.",
    "What I do know is that the disappointment wasn't confined to the business itself. I'd spent years building my life around something that ultimately hadn't worked out. Without it, I wasn't entirely sure what direction to take.",
    "I had experience, but not the kind of career I'd imagined. I'd spent much of my adult life working for myself, yet I struggled to establish myself in the industry I'd been trying to build a business within.",
    "I moved between jobs, trying to find my feet and work out what came next.",
    "Eventually, I did find a way into marketing professionally.",
    "On paper, that should have felt like progress. I had spent years trying to establish myself in the industry, and now I finally had the opportunity to develop a career in it.",
    "But within months, I found myself questioning things again.",
    "I wasn't happy, and I was struggling to understand why.",
    "There was nothing inherently wrong with pursuing a career in marketing. There are parts of the work I find interesting, and I've learned skills that I value. But I was beginning to recognise that reaching a goal didn't necessarily produce the feeling I had expected it to.",
    "I'd spent years wanting to build a successful agency. Then I'd wanted to establish myself professionally. Each time, I'd imagined that reaching the next stage might resolve something.",
    "And each time, the underlying dissatisfaction seemed to find its way back.",
    "It began affecting more than my professional life. I wasn't particularly comfortable with the direction I was going in, or with the extent to which that dissatisfaction was influencing other parts of my life.",
    "For a long time, I'd been very focused on what I wanted to achieve.",
    "I hadn't spent nearly as much time considering why I wanted to achieve it.",
    "Or what I expected achievement to give me."
  ],
  [
    "Somewhere during that period, I read *The Courage to Be Disliked*, by Ichiro Kishimi and Fumitake Koga.",
    "I don't want to exaggerate what happened. I didn't finish a book one evening and suddenly understand everything about myself. Nor did reading it make the difficulties in my life disappear.",
    "But it introduced me to ideas that changed the way I looked at many of the decisions I'd made.",
    "The book draws on the psychology of Alfred Adler. Among the ideas that stayed with me were its treatment of the desire for recognition, the importance of social interest and the possibility of finding meaning through contribution.",
    "I'd never properly considered how much of my life had been shaped by the desire to be recognised, which often comes from a place or feeling of inferiority.",
    "I knew I was ambitious. I'd always thought of that as a positive quality, something that encouraged me to work hard, take risks and pursue things that mattered to me.",
    "And I still believe ambition can be a good thing.",
    "But I began to wonder how much of my ambition had been driven by genuine interest, and how much had been driven by what success might allow me to think about myself.",
    "When I was playing tennis, I wanted to be good. Really good. I loved the sport, and that love was genuine, but there was also an imagined version of myself who had achieved something exceptional.",
    "When I started my agency, I wanted to build a successful company. Again, the interest was genuine. I enjoyed aspects of entrepreneurship, and I still do. But I was also attached to the idea of being someone who had built a successful business.",
    "When that didn't happen, I found it incredibly difficult to accept.",
    "And when I began pursuing a career in marketing, I wonder whether I was still looking for something similar: another way to establish that I was capable, that I was going somewhere, that the years I'd spent working towards a future hadn't been wasted.",
    "These weren't necessarily conscious thoughts. I don't believe I was spending every day deliberately seeking approval from other people.",
    "It was more subtle than that.",
    "I'd developed a way of evaluating myself in which achievement carried an enormous amount of weight. What I accomplished, what I might accomplish in the future and what other people thought of those accomplishments had become closely connected to how I felt about myself.",
    "I was constantly looking towards some future version of my life in which I had finally done enough.",
    "And I was beginning to realise that I might never arrive there.",
    "Because there would always be something else.",
    "A bigger business. A better position. More money. Greater recognition. Another achievement that seemed important until I'd reached it, at which point something new would take its place.",
    "For years, I'd been asking myself whether I was successful enough.",
    "I hadn't seriously questioned why success had become the measure by which I was judging my life in the first place.",
    "That was an uncomfortable realisation.",
    "Not because it meant everything I'd pursued had been meaningless. I don't think that would be fair. Tennis gave me years of enjoyment and taught me things I still value. Starting a business demanded initiative, responsibility and persistence. Even when it wasn't successful, the experience was real.",
    "But I could begin to see how something I'd genuinely cared about could gradually become entangled with my need to prove myself.",
    "And I think that's what happened.",
    "At some point, the prospect of admitting that the business wasn't working became harder to face than the prospect of continuing with something that was making me unhappy.",
    "I'd become so concerned with what failure would mean for my identity that I was losing sight of the business itself.",
    "Recognising that was important.",
    "But the more significant realisation was that I didn't have to continue living in the same way."
  ],
  [
    "The idea of contribution was what really stayed with me.",
    "At first, it sounds straightforward. Most of us would agree that doing something useful for other people is worthwhile.",
    "But I hadn't been thinking about my life in those terms.",
    "I had been thinking about what I wanted to become, what I wanted to achieve and how I might eventually feel if I succeeded.",
    "The emphasis was almost always on me.",
    "Adler's idea of social interest offered me another way of thinking about my relationship with the world around me.",
    "Rather than treating other people as an audience whose recognition I needed to earn, I could begin to see myself as part of a community, someone who belonged among other people and could make a contribution through the way I chose to live.",
    "I didn't have to become exceptional before my life could have value.",
    "I didn't have to wait until I'd built a successful company, achieved some particular status or proved that I was better than the person I'd been a few years earlier.",
    "I could begin from where I was.",
    "And instead of asking what would make other people recognise me, I could ask what I was genuinely interested in doing, what I could become better at and how that might be useful to somebody else.",
    "It sounds like a small change in emphasis.",
    "For me, it wasn't.",
    "It changed how I thought about work, about entrepreneurship and about the sort of person I wanted to become.",
    "I'd spent years believing that building a successful business might give me a sense of worth. Now I was beginning to wonder what it would look like to build a business because I believed the work itself was worth doing.",
    "I could still be entrepreneurial. I could still care about creating something sustainable and financially successful. I could still be ambitious.",
    "But success wouldn't need to serve as the final verdict on whether I was good enough.",
    "That distinction has become increasingly important to me.",
    "I don't think a life of contribution means abandoning your own interests, neglecting your needs or sacrificing everything for other people. Nor do I think earning money somehow makes an activity less meaningful.",
    "A business needs to make money to survive. Good work deserves to be paid for. There is nothing contradictory about wanting to build something commercially successful and wanting it to make a positive difference to the people it serves.",
    "The question, for me, is what sits at the centre of the ambition.",
    "Am I pursuing something because I care about the work, believe it has value and want to see how well I can do it?",
    "Or am I pursuing it because I need the outcome to tell me something about who I am?",
    "I don't pretend that I've completely resolved that question.",
    "I still care about achievement. I still compare myself with other people sometimes. I still feel the pull of wanting to be successful, and I doubt those feelings will disappear simply because I've become more aware of them.",
    "But I notice them differently now.",
    "And I think that awareness gives me a choice I didn't previously realise I had."
  ],
  [
    "Around the same time, I began looking more seriously at my relationship with health and physical training.",
    "For years, I'd been disconnected from something that had once occupied such an important place in my life.",
    "When I stopped playing tennis, I hadn't stopped being interested in what the human body could do. I'd simply stopped giving that interest much attention.",
    "As I began training again, I found myself increasingly drawn to questions that went beyond performance in any particular sport.",
    "How do we develop strength? What allows people to remain physically capable as they get older? How does the body adapt to training, and why do some approaches work better than others? What can we do to preserve our health and independence over the course of our lives?",
    "The more I learned, the more I wanted to understand.",
    "I became interested not just in training, but in the science behind it. In the relationship between exercise, health and the way people experience their own bodies. In how relatively ordinary decisions, repeated over long periods, can affect the quality of someone's life.",
    "I also began reconsidering what being an athlete meant to me.",
    "For a long time, I'd associated athletic achievement with the standard I'd failed to reach when I was younger.",
    "Professional sport had been the goal, and when that was no longer possible, I'd behaved almost as though the rest of it wasn't worth pursuing.",
    "I can see now how narrow that understanding was.",
    "There are many reasons to train that have nothing to do with becoming a professional athlete. You can want to be stronger, fitter, more capable or simply more comfortable in your own body. You can pursue physical development because you enjoy the process, because you value your health or because you want to see what you're capable of.",
    "You don't need an exceptional outcome to justify the effort.",
    "That doesn't mean I no longer care about performance.",
    "I do.",
    "But I'm beginning to understand that the value of physical training reaches far beyond what someone can achieve in a sporting environment.",
    "For somebody who has never felt comfortable exercising, building the confidence to walk into a gym can be a significant step. For someone who has spent years struggling with their physical health, being able to move more comfortably or manage the demands of everyday life can change how they experience the world around them. And for someone growing older, maintaining strength, fitness and physical independence can become increasingly important.",
    "These things matter, even if they rarely receive the attention we give to exceptional athletic performances.",
    "The more I thought about health and exercise in those terms, the more interested I became in the possibility of helping other people.",
    "I began thinking about how much uncertainty surrounds fitness for someone without a background in sport or training. There is an extraordinary amount of information available, much of it contradictory, and it isn't always easy to distinguish between good advice, personal opinion and something designed primarily to sell a product.",
    "Even when somebody knows they want to become healthier, knowing where to begin can be difficult.",
    "And beginning is only part of it.",
    "Learning how to train, understanding what progress looks like, developing habits that fit around work and family, and finding ways to continue when life becomes difficult are challenges that deserve more attention than they often receive.",
    "I think there is real value in helping somebody navigate those things.",
    "Not simply by giving them a programme and expecting them to follow it, but by taking the time to understand their circumstances, explain why they're doing what they're doing and help them develop confidence in their own abilities.",
    "That's the kind of work I'm becoming increasingly interested in.",
    "It's also what has led me towards personal training.",
    "I don't see coaching as something that should make a person permanently dependent on the person coaching them. At its best, I think it should do something close to the opposite.",
    "If someone begins working with me feeling uncertain about exercise, I'd like them to become more knowledgeable and more confident over time. I'd like them to understand the purpose of their training, recognise their own progress and gradually become more capable of making decisions for themselves.",
    "There may come a point when they no longer need the same level of support.",
    "I'd consider that a good outcome.",
    "Of course, people have different reasons for seeking coaching. Some want accountability. Others want help achieving a particular goal, improving their performance or making exercise a consistent part of their lives. There's no single measure of what successful coaching looks like.",
    "But I'd like the underlying relationship to be one in which the person I'm working with becomes more capable, not simply more reliant on me.",
    "I've also become interested in what it means to provide genuinely good coaching, rather than merely deliver a service.",
    "I think that requires more than enthusiasm for fitness or the ability to put together a training programme. It requires knowledge, judgement, patience and an understanding that the person in front of you has a life extending far beyond the time they spend exercising.",
    "It means recognising when something isn't working, being prepared to change your approach and taking responsibility for continuing to develop your own understanding.",
    "There is an enormous amount I have yet to learn.",
    "The more I've explored exercise science and human health, the more aware I've become of the complexity involved. I don't expect to have an answer to every question, and I'd be wary of anyone who claimed to.",
    "But I want to keep learning. I want my decisions to be informed by good evidence and by the individual circumstances of the people I work with. I want to be able to explain my reasoning, acknowledge uncertainty and recognise where my knowledge or professional responsibilities have their limits.",
    "Above all, I want the work to be useful to the person receiving it."
  ],
  [
    "I'm now building AB Personal Training, my independent coaching business at JD Gyms Renfrew, while continuing to work in marketing.",
    "It's still early, and I don't know exactly what it will become.",
    "But I have a much clearer idea of the kind of business I want to build than I did when I first became interested in entrepreneurship.",
    "I want it to be a place where people feel listened to, where their goals are taken seriously and where they're treated as individuals rather than another appointment in somebody's diary.",
    "I want to build a reputation for being thorough, thoughtful and honest. For providing a quality of coaching that reflects the trust somebody places in me when they decide to ask for help.",
    "And I want the work to have a lasting effect.",
    "Not necessarily something dramatic. Perhaps it's someone discovering that they enjoy exercising after years of avoiding it. Someone becoming stronger and more confident in their everyday life. Someone developing an understanding of their health that allows them to make better decisions long after our time working together has ended.",
    "I think there's something meaningful in those outcomes, even when they're difficult to measure or unlikely to attract much recognition.",
    "I'm interested in where this might lead beyond personal training, too. The relationship between exercise, health, physical capability and the way we age is something I want to continue exploring. I don't yet know what shape that interest will take professionally, but I'd like learning about those things to remain a significant part of my life.",
    "My immediate responsibility, though, is much simpler: to become a better coach and do good work for the people who choose to work with me.",
    "I still want to build a successful business.",
    "I'd like AB Personal Training to grow into something sustainable, something that gives me the opportunity to develop professionally, earn a good living and perhaps contribute on a greater scale in the future.",
    "But I want any growth to be a consequence of doing worthwhile work, not a substitute for it.",
    "If the business becomes bigger, I want the standards behind it to matter just as much as they did at the beginning. I don't want to become so concerned with acquiring more clients, generating more revenue or appearing successful that I lose sight of the people the business exists to serve.",
    "I'm aware that saying these things is easier than putting them into practice.",
    "The pressures of running a business don't disappear because your intentions are good. There will be commercial decisions to make, difficult periods to work through and moments when the interests of the business and the needs of the people involved aren't perfectly aligned.",
    "I don't imagine I'll get every decision right.",
    "But I want to have a clearer sense of what I'm trying to achieve, and why, than I did when I started my first company.",
    "For years, I thought a successful business would give me something I was missing. Now I'd like to approach it from the other direction: to see whether I can build something worthwhile by starting with the value it might have for other people.",
    "Perhaps that will lead to commercial success. I certainly hope it does.",
    "But I don't want that to be the only way I judge whether it was worth doing."
  ],
  [
    "I sometimes think about the difference between what I wanted from life at eighteen and what I want from it now.",
    "Back then, so much of my attention was directed towards the person I hoped to become. First an athlete, then an entrepreneur, then someone who had established himself professionally.",
    "There was always a future in which I imagined things might finally make sense.",
    "I don't regret having ambitions. I still have plenty of them.",
    "But I wish I'd understood sooner that there were other ways to find meaning in what I was doing.",
    "I could enjoy sport without needing to become a professional. I could take pride in building something without allowing its success or failure to determine my worth. I could pursue a career because I valued the work, rather than because of what reaching a particular position might say about me.",
    "And I could begin to think about my place in the world in terms of what I might contribute, rather than what I might receive in recognition.",
    "I know that understanding these ideas doesn't mean I'll always live according to them.",
    "I'll still become frustrated with myself. I'll still want to achieve more, and there will probably be times when I care too much about whether other people think I'm successful.",
    "But I'm beginning to recognise that those feelings don't have to determine the decisions I make.",
    "I can choose to direct my ambitions towards something I believe is useful.",
    "I can take the work seriously, without treating every outcome as a judgement on who I am.",
    "And I can try to leave the people I work with better equipped, more confident and more capable than they were before we met.",
    "I don't know where any of this will lead.",
    "I hope that, years from now, I'll have built a business I'm proud of and developed a deeper understanding of the work I've chosen to pursue.",
    "But more than that, I hope there will be people whose lives are a little better because of something I was able to contribute.",
    "I spent a long time thinking about what I needed to achieve to become somebody.",
    "I'm much more interested now in what I can do for somebody else."
  ]
];

const readMinutes = Math.ceil(chapters.flat().join(" ").trim().split(/\s+/).length / 225);

function renderParagraph(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.startsWith("*") && part.endsWith("*")
      ? <cite key={index}>{part.slice(1, -1)}</cite>
      : part
  );
}

export default function About() {
  return (
    <PageShell className="about-journal-page">
      <header className="journal-masthead" aria-labelledby="journal-title">
        <div className="journal-masthead-rail">
          <a href="/" className="journal-return">AB Personal Training</a>
          <span>Personal writing</span>
        </div>
        <div className="journal-masthead-intro">
          <p className="journal-kicker">An essay by Aidan Brotherhood</p>
          <h1 id="journal-title">What I Was Trying to Prove</h1>
          <p className="journal-deck">
            On sport, ambition, recognition and learning to contribute.
          </p>
        </div>
        <div className="journal-masthead-meta">
          <span>Aidan Brotherhood</span>
          <span><time dateTime="2026-11-04">4 November 2026</time><span aria-hidden="true"> · </span>{readMinutes} min read</span>
        </div>
      </header>

      <article className="journal-article" aria-labelledby="journal-title">
        {chapters.map((paragraphs, chapterIndex) => (
          <div className="journal-chapter" key={chapterIndex}>
            {chapterIndex > 0 && <hr className="journal-break" />}
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className={chapterIndex === 0 && paragraphIndex === 0 ? "journal-opening" : undefined}
              >
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>
        ))}
      </article>

      <aside className="journal-afterword" aria-label="About the author">
        <div className="journal-afterword-inner">
          <p className="journal-afterword-signature">Aidan Brotherhood</p>
          <p className="journal-afterword-caption">
            Independent personal trainer at JD Gyms Renfrew.
          </p>
          <a href="/about/approach" className="journal-afterword-link">
            Read about my approach to coaching <span aria-hidden="true">↗</span>
          </a>
        </div>
      </aside>
    </PageShell>
  );
}
